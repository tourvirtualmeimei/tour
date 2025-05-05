// Importa as configurações de cenas, funções para POIs, utilitários e controles
import { sceneConfigurations } from './scenes.js';
import { createPOIMesh, updatePOIs } from './pois.js';
import { loadNewSphere, fadeTransition } from './utils.js';
import { setupControls, updateCameraView } from './controls.js';

// Declara variáveis principais
let container, scene, camera, renderer, sphere, material;
let textureLoader = new THREE.TextureLoader();
let currentScene = 1;
window.currentProjection = 'spherical';
let isTransitioning = false;

// Obtém o elemento HTML onde será exibido o tour
container = document.getElementById('container');

// Cria a cena 3D
scene = new THREE.Scene();

window.addTestPOI = function (x, y, z) {
    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    scene.add(sphere);
};

// Cria a câmera
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.target = new THREE.Vector3();

// Cria o renderizador WebGL
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);

// Adiciona o renderizador ao HTML
container.appendChild(renderer.domElement);

// Função para trocar de cena
function switchScene(sceneNumber, forceLoader = false) {
    if (isTransitioning) return;

    isTransitioning = true;
    currentScene = sceneNumber;
    window.currentProjection = sceneConfigurations[sceneNumber].projection || 'spherical';

    fadeTransition(
        sceneConfigurations[sceneNumber].image,
        currentProjection,
        scene,
        camera,
        textureLoader,
        sphere,
        (newSphere) => {
            sphere = newSphere;
            updatePOIs(sceneNumber, scene, camera, renderer);
            isTransitioning = false;
        },
        forceLoader
    );
}

// Torna a função switchScene acessível globalmente
window.switchScene = switchScene;

// ✅ Nova função global para exibir vídeo do YouTube
window.showVideo = function (youtubeId = 'OTiZUyA8pwY') {
    const overlay = document.getElementById('videoOverlay');
    const iframe = document.getElementById('youtubeIframe');
    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    overlay.style.display = 'flex';
};

// Função global para exibir uma imagem PNG
window.showImage = function (imagePath) {
    const imageContainer = document.getElementById('imageContainer');
    const imageViewer = document.getElementById('imageViewer');
    if (imageViewer && imageContainer) {
        imageViewer.src = imagePath;
        imageContainer.style.display = 'flex';
    }
};

// Fechar imagem ao clicar fora
const imageContainer = document.getElementById('imageContainer');
if (imageContainer) {
    imageContainer.addEventListener('click', function (event) {
        if (event.target.id === 'imageContainer') {
            imageContainer.style.display = 'none';
        }
    });
}

// ✅ Fechar vídeo do YouTube ao clicar fora do iframe
const videoOverlay = document.getElementById('videoOverlay');
if (videoOverlay) {
    videoOverlay.addEventListener('click', function (event) {
        if (event.target.id === 'videoOverlay') {
            const iframe = document.getElementById('youtubeIframe');
            iframe.src = '';
            videoOverlay.style.display = 'none';
        }
    });
}

// Inicializa os controles da câmera
setupControls(container, camera);

// Carrega a cena inicial
switchScene(currentScene, true);

// Função de renderização
function render() {
    updateCameraView(camera);

    scene.children.forEach(child => {
        if (child.isPOI) child.lookAt(camera.position);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();

// Evento de clique para interação com POIs
container.addEventListener('click', function (event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    intersects.forEach(intersect => {
        if (intersect.object.isPOI && intersect.object.action) {
            intersect.object.action(); // Executa ação do POI (vídeo, navegação ou imagem)
        }
    });

    // Fechar vídeo se clicar fora de um POI de vídeo
    const clickedPOIVideo = intersects.some(intersect => intersect.object.poiType === 'video');
    const videoOverlay = document.getElementById('videoOverlay');

    if (!clickedPOIVideo && videoOverlay && videoOverlay.style.display === 'flex') {
        const iframe = document.getElementById('youtubeIframe');
        iframe.src = '';
        videoOverlay.style.display = 'none';
    }
});

// Evento de movimento do mouse para destacar POIs
container.addEventListener('mousemove', function (event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    scene.children.forEach(child => {
        if (child.isPOI) {
            child.scale.set(1, 1, 1);
        }
    });

    const intersects = raycaster.intersectObjects(scene.children);
    intersects.forEach(intersect => {
        if (intersect.object.isPOI) {
            intersect.object.scale.set(1.2, 1.2, 1.2);
        }
    });
});

// Variáveis globais
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedMarker = null;
let isRightMouseDown = false;
let markerDirection = null;

// Clique direito: cria marcador
window.addEventListener('contextmenu', function (event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(sphere);

    if (intersects.length > 0) {
        const point = intersects[0].point;
        console.log('📌 Coordenada clicada:', point);

        if (selectedMarker) scene.remove(selectedMarker);

        selectedMarker = new THREE.Mesh(
            new THREE.SphereGeometry(10, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        selectedMarker.position.copy(point);
        scene.add(selectedMarker);

        markerDirection = raycaster.ray.direction.clone().normalize();
        isRightMouseDown = true;
    } else {
        console.log('❌ Nenhuma interseção com a esfera encontrada.');
    }
});

// Solta botão direito
window.addEventListener('mouseup', function (event) {
    if (event.button === 2) {
        isRightMouseDown = false;
    }
});

// Scroll move marcador
window.addEventListener('wheel', function (event) {
    if (isRightMouseDown && selectedMarker && markerDirection) {
        const distance = event.deltaY > 0 ? -5 : 5;
        const offset = markerDirection.clone().multiplyScalar(distance);
        selectedMarker.position.add(offset);
        console.log('📏 Nova posição:', selectedMarker.position);
    }
});

// Clique no menu troca de cena
window.handleSceneClick = function (sceneId) {
    switchScene(sceneId, true);

    if (window.innerWidth <= 768) {
        const menu = document.getElementById("menu-lateral");
        menu.classList.remove("active");
    }
};
