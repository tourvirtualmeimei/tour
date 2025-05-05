// Variáveis globais para controlar interação do usuário e ângulos da câmera
let isUserInteracting = false, // Se o usuário está clicando ou tocando
    lon = 0, lat = 0,          // Coordenadas de longitude e latitude (em graus)
    phi = 0, theta = 0;        // Coordenadas esféricas convertidas para radianos

// Variáveis que armazenam o estado no momento do início da interação
let onPointerDownPointerX = 0, onPointerDownPointerY = 0;
let onPointerDownLon = 0, onPointerDownLat = 0;

// Função para configurar os eventos de controle da câmera
export function setupControls(container, camera) {
    // Evento de clique pressionado (mouse down)
    container.addEventListener('mousedown', function (event) {
        isUserInteracting = true; // Começa a interação
        onPointerDownPointerX = event.clientX; // Guarda posição do clique
        onPointerDownPointerY = event.clientY;
        onPointerDownLon = lon; // Guarda ângulos atuais
        onPointerDownLat = lat;
    }, false);

    // Evento de movimento do mouse enquanto clicado
    container.addEventListener('mousemove', function (event) {
        if (isUserInteracting) {
            // Atualiza longitude e latitude com base na movimentação do mouse
            lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
            lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
        }
    }, false);

    // Evento de soltar o clique (mouse up)
    container.addEventListener('mouseup', function () {
        isUserInteracting = false; // Finaliza a interação
    }, false);

    // === Controles para dispositivos móveis ===

    // Início do toque
    container.addEventListener('touchstart', function (event) {
        isUserInteracting = true;
        const touch = event.touches[0]; // Pega o primeiro dedo na tela
        onPointerDownPointerX = touch.clientX;
        onPointerDownPointerY = touch.clientY;
        onPointerDownLon = lon;
        onPointerDownLat = lat;
    }, false);

    // Movimento do toque
    container.addEventListener('touchmove', function (event) {
        if (isUserInteracting && event.touches.length === 1) {
            const touch = event.touches[0];
            lon = (onPointerDownPointerX - touch.clientX) * 0.1 + onPointerDownLon;
            lat = (touch.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
        }
    }, false);

    // Fim do toque
    container.addEventListener('touchend', function () {
        isUserInteracting = false;
    }, false);
}

// Função chamada no loop de renderização para atualizar a câmera com base nos ângulos
export function updateCameraView(camera) {
    // Limita latitude para não girar completamente (evita virar de cabeça pra baixo)
    // Limites variáveis com base no tipo de projeção atual
    const minLat = window.currentProjection === 'cylindrical' ? -10 : -85;
    const maxLat = window.currentProjection === 'cylindrical' ? 10 : 85;

    lat = Math.max(minLat, Math.min(maxLat, lat));

    // Converte latitude e longitude de graus para radianos (phi e theta)
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);

    // Calcula a nova posição para onde a câmera deve olhar (vetor de destino)
    camera.target.set(
        500 * Math.sin(phi) * Math.cos(theta), // x
        500 * Math.cos(phi),                   // y
        500 * Math.sin(phi) * Math.sin(theta)  // z
    );

    // Faz a câmera olhar para o novo alvo calculado
    camera.lookAt(camera.target);
}
