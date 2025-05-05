// Função que cria um POI (ponto de interesse) visual na cena
export function createPOIMesh(poiConfig, camera, renderer) {
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(30, 30);

    let texturePath = 'images/icon/default_icon.png';

    const tipos = {
        navigation: 'arrow.png',
        video: 'play_icon.png',
        info: 'play_icon.png',
        recepcao: 'recepcao.png',
        cinema: 'cinema.png',
        lavanderia: 'lavanderia.png',
        menino: 'menino.png',
        menina: 'menina.png',
        playground: 'playground.png',
        bercario: 'bercario.png',
        refeitorio: 'refeitorio.png',
        cozinha: 'cozinha.png',
        eventos: 'eventos.png',
        playbebe: 'playbebe.png',
        image: 'info.png' // Ícone para imagem
    };

    if (tipos[poiConfig.type]) {
        texturePath = `images/icon/${tipos[poiConfig.type]}`;
    }

    const texture = textureLoader.load(texturePath);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    if (renderer && renderer.capabilities) {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        side: THREE.DoubleSide
    });

    const poiMesh = new THREE.Mesh(geometry, material);

    poiMesh.position.copy(poiConfig.position);
    poiMesh.lookAt(camera.position);
    poiMesh.scale.set(10, 10, 10);

    poiMesh.isPOI = true;
    poiMesh.poiType = poiConfig.type;
    poiMesh.target = poiConfig.target;

    // ✅ Define a ação correta, com prioridade para a função que veio do scenes.js
    if (typeof poiConfig.action === 'function') {
        poiMesh.action = poiConfig.action;
    } else if (poiConfig.type === 'video') {
        poiMesh.action = () => showVideo();
    } else if (poiConfig.type === 'image') {
        poiMesh.action = () => showImage(poiConfig.target);
    } else {
        poiMesh.action = null;
    }

    return poiMesh;
}

// Função que atualiza os POIs da cena
export function updatePOIs(sceneNumber, scene, camera, renderer) {
    import('./scenes.js').then(({ sceneConfigurations }) => {
        const poisToRemove = scene.children.filter(child => child.isPOI);
        poisToRemove.forEach(poi => {
            scene.remove(poi);
            poi.geometry.dispose();
            poi.material.dispose();
        });

        sceneConfigurations[sceneNumber].pois.forEach(poiConfig => {
            const poi = createPOIMesh(poiConfig, camera, renderer);
            scene.add(poi);
        });
    });
}
