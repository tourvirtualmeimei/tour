// Função que carrega uma nova esfera (ou cilindro) com textura e aplica um efeito de fade-in
export function loadNewSphere(imagePath, projection, scene, camera, textureLoader, oldSphere, callback) {
    textureLoader.load(imagePath, function (texture) {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.99, 1);

        // Remove esfera anterior
        if (oldSphere) scene.remove(oldSphere);

        // Remove planos de fade antigos
        scene.children.forEach(child => {
            if (child.isFade) {
                scene.remove(child);
                child.geometry.dispose();
                child.material.dispose();
            }
        });

        // Cria nova geometria com base na projeção
        let geometry;
        if (projection === 'spherical') {
            geometry = new THREE.SphereGeometry(500, 60, 40);
        } else {
            geometry = new THREE.CylinderGeometry(500, 500, 1000, 60, 32, true);
        }
        geometry.scale(-1, 1, 1);

        // Cria material e mesh da esfera
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Adiciona preenchimento superior e inferior se for cilíndrica
        if (projection === 'cylindrical') {
            const stretchedTexture = texture.clone();
            stretchedTexture.wrapS = THREE.RepeatWrapping;
            stretchedTexture.wrapT = THREE.ClampToEdgeWrapping;

            const edgeMaterial = new THREE.MeshBasicMaterial({
                map: stretchedTexture,
                transparent: true,
                opacity: 0.7,
                side: THREE.BackSide,
                depthWrite: false
            });

            const topFill = new THREE.Mesh(
                new THREE.PlaneGeometry(1000, 400),
                edgeMaterial
            );
            topFill.position.y = 500;
            topFill.rotation.x = -Math.PI / 2;
            topFill.isFade = true;
            scene.add(topFill);

            const bottomFill = new THREE.Mesh(
                new THREE.PlaneGeometry(1000, 400),
                edgeMaterial
            );
            bottomFill.position.y = -500;
            bottomFill.rotation.x = Math.PI / 2;
            bottomFill.isFade = true;
            scene.add(bottomFill);
        }

        // Animação de fade-in
        const duration = 250;
        let start = null;

        function fadeIn(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;

            material.opacity = Math.min(progress / duration, 1);
            camera.fov = 65 + (progress / duration) * 10;
            camera.updateProjectionMatrix();

            if (progress < duration) {
                requestAnimationFrame(fadeIn);
            } else {
                material.opacity = 1;
                camera.fov = 75;
                camera.updateProjectionMatrix();
                if (callback) callback(sphere);
            }
        }

        requestAnimationFrame(fadeIn);
    });
}

export function fadeTransition(newImagePath, projection, scene, camera, textureLoader, oldSphere, callback, forceShowLoader = false) {
    const loaderDiv = document.getElementById('loader');
    let loaderTimeout;

    if (forceShowLoader) {
        loaderDiv.style.display = 'flex'; // Mostra imediatamente se for forçado
    } else {
        // Só mostra depois de 500ms se demorar pra carregar
        loaderTimeout = setTimeout(() => {
            loaderDiv.style.display = 'flex';
        }, 255);
    }

    const duration = 200;
    let start = null;

    function fadeOut(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        if (oldSphere && oldSphere.material) {
            oldSphere.material.opacity = Math.max(1 - progress / duration, 0);
            oldSphere.material.transparent = true;
        }

        camera.fov = 75 - (progress / duration) * 10;
        camera.updateProjectionMatrix();

        if (progress < duration) {
            requestAnimationFrame(fadeOut);
        } else {
            if (oldSphere) scene.remove(oldSphere);

            const wrappedCallback = (newSphere) => {
                clearTimeout(loaderTimeout); // cancela timeout se não chegou a exibir
                loaderDiv.style.display = 'none'; // sempre esconde após carregar
                if (callback) callback(newSphere);
            };

            loadNewSphere(
                newImagePath,
                projection,
                scene,
                camera,
                textureLoader,
                oldSphere,
                wrappedCallback
            );
        }
    }

    requestAnimationFrame(fadeOut);
}
