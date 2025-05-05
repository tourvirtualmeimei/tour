// Define e exporta um objeto contendo a configuração de todas as cenas do tour virtual
export const sceneConfigurations = {
    // Cena 1: Frente do portão
    1: {
        image: 'images/frente_portao.jpeg', // Caminho da imagem equiretangular ou cilíndrica
        projection: 'spherical', // Tipo de projeção (esférica)
        pois: [ // Pontos de interesse da cena
            {
                type: 'navigation', // Tipo de POI: navegação entre cenas
                position: new THREE.Vector3(-196, -27, -150), // Posição 3D do POI
                action: () => switchScene(2) // Ação ao clicar: muda para a cena 2
            },
            //Info:
            {type: 'image',position: new THREE.Vector3(-213, 50, -200),target: 'images/infos/portão_info.png'}
        ]
    },

    // Cena 2: Frente da recepção
    2: {
        image: 'images/frente_recepcao.jpeg',
        projection: 'spherical',
        pois: [
            { type: 'recepcao', position: new THREE.Vector3(-267, 81, 132), action: () => switchScene(6) },
            { type: 'cinema', position: new THREE.Vector3(-249, 86, 236), action: () => switchScene(7) },
            { type: 'lavanderia', position: new THREE.Vector3(-278, 145, 261), action: () => switchScene(8) },
            { type: 'playground', position: new THREE.Vector3(48, 139, 386), action: () => switchScene(10) },
            { type: 'navigation', position: new THREE.Vector3(-6, -49, -325), action: () => switchScene(1) },
            { type: 'eventos', position: new THREE.Vector3(-373, 107, 15), action: () => switchScene(9) },
            { type: 'navigation', position: new THREE.Vector3(-97, 79, 271), action: () => switchScene(3) }
        ]
    },

    // Cena 3: Curva da rua
    3: {
        image: 'images/curva_rua.jpeg',
        projection: 'cylindrical', // Aqui usamos projeção cilíndrica
        pois: [
            { type: 'navigation', position: new THREE.Vector3(66, -200, -357), action: () => switchScene(2) },
            { type: 'navigation', position: new THREE.Vector3(132, -61, 251), action: () => switchScene(4) },
            { type: 'menino', position: new THREE.Vector3(-116, -85, 259), action: () => switchScene(16) },
            { type: 'playground', position: new THREE.Vector3(207, -60, -117), action: () => switchScene(10) }
        ]
    },

    // Cena 4: Topo da rua
    4: {
        image: 'images/topo rua.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-152, -27, -168), action: () => switchScene(3) },
            { type: 'navigation', position: new THREE.Vector3(60, 52, 186), action: () => switchScene(5) }
        ]
    },

    // Cena 5: Hall do refeitório e quartos
    5: {
        image: 'images/hall_refeitorio_quartos.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-48, -34, -286), action: () => switchScene(4) },
            { type: 'refeitorio', position: new THREE.Vector3(-1.5, 21, 235), action: () => switchScene(15) },
            { type: 'menina', position: new THREE.Vector3(283, 55, 55), action: () => switchScene(11) },
            { type: 'playbebe', position: new THREE.Vector3(206, 52, 246), action: () => switchScene(12) }
        ]
    },

    // Cena 6: Recepção
    6: {
        image: 'images/recepcao.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(58, 18, -329), action: () => switchScene(2) },
            { type: 'video', position: new THREE.Vector3(-133, 20, 3), action: () => showVideo() },
            //Info:
            {type: 'image',position: new THREE.Vector3(-135, 26, -142),target: 'images/infos/recepcao_info.png'}
        ]
    },

    // Cena 7: Cinema
    7: {
        image: 'images/Cinema.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-172, 10, -152), action: () => switchScene(2) },
            //Info:
            {type: 'image',position: new THREE.Vector3(-283, 61, -108),target: 'images/infos/cinema_info.png'}
        ]
    },

    // Cena 8: Lavanderia
    8: {
        image: 'images/lavanderia.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-362, 42, -46), action: () => switchScene(2) },
            { type: 'eventos', position: new THREE.Vector3(355, 60, 122), action: () => switchScene(9) }
        ]
    },

    // Cena 9: Espaço de eventos
    9: {
        image: 'images/eventos.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-250, 50, 75), action: () => switchScene(2) },
            { type: 'lavanderia', position: new THREE.Vector3(200, 75, -100), action: () => switchScene(8) },
            //Info:
            {type: 'image',position: new THREE.Vector3(-213, 50, -200),target: 'images/infos/eventos_info.png'}
        ]
    },

    // Cena 10: Playground e bosque
    10: {
        image: 'images/playground_bosque.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(324, -182, -185), action: () => switchScene(2) },
            { type: 'navigation', position: new THREE.Vector3(-165, -87, -312), action: () => switchScene(3) }
        ]
    },

    // Cena 11: Quarto das meninas
    11: {
        image: 'images/quarto meninas.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-260, 40, -59), action: () => switchScene(5) },
            //Info:
            {type: 'image',position: new THREE.Vector3(-123, 53, -265),target: 'images/infos/meninas_info.png'}
        ]
    },

    // Cena 12: Playground bebê
    12: {
        image: 'images/PLAYGROUND BEBE.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(-195, -7, -171), action: () => switchScene(5) },
            { type: 'bercario', position: new THREE.Vector3(-103, 41, 214), action: () => switchScene(13) }
        ]
    },

    // Cena 13: Berçário
    13: {
        image: 'images/bercario.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'playbebe', position: new THREE.Vector3(-328, 44, 237), action: () => switchScene(12) },
            //Info:
            {type: 'image',position: new THREE.Vector3(-225, 67, -276),target: 'images/infos/bercario_info.png'}
        ]
    },

    // Cena 14: Cozinha
    14: {
        image: 'images/cozinha.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'refeitorio', position: new THREE.Vector3(-190, 7, 183), action: () => switchScene(15) },
            //Info:
            {type: 'image',position: new THREE.Vector3(252, 9, -160),target: 'images/infos/cozinha_info.png'}
        ]
    },

    // Cena 15: Refeitório
    15: {
        image: 'images/refeitorio.jpeg',
        projection: 'cylindrical',
        pois: [
            { type: 'cozinha', position: new THREE.Vector3(244, 9, -102), action: () => switchScene(14) },
            { type: 'navigation', position: new THREE.Vector3(21, 13, -293), action: () => switchScene(5) },
            //Info:
            {type: 'image',position: new THREE.Vector3(174, 26, -206),target: 'images/infos/refeitorio_info.png'}
        ]
    },

    // Cena 16: Quarto Meninos
    16: {
        image: 'images/quarto_meninos.jpg',
        projection: 'cylindrical',
        pois: [
            { type: 'navigation', position: new THREE.Vector3(209, 3, 227), action: () => switchScene(3) },
            //Info:
            {type: 'image',position: new THREE.Vector3(-18, 23, 210),target: 'images/infos/meninos_info.png'}
        ]
    }
};
