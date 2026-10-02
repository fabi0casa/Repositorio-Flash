// Carrega o arquivo header.html no elemento com id="header"
function loadHeader() {
    const headerElement = document.getElementById('header');
    if (!headerElement) return;

    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar header.html: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            headerElement.innerHTML = html;
            configureHeader();
        })
        .catch(err => {
            console.warn('Carregamento via fetch falhou (comum em file://). Usando fallback local.', err);
            headerElement.innerHTML = `
<div class="headtag">
	<a class="ret" href="index.html">
		<div class="home-download" style="display: flex; align-items: center;">
			<img id="header-logo" src="media/images/flash.png" style="width: 100px; height: 100px; margin-right: 10px;">
			<div>
				<h1>Jogos Flash<br> Usando emulador</h1>
			</div>
		</div>
	</a>
</div>
<div class="linkbar">
	<div class="ret">
		<b>
		<a class="blink" href="index.html" id="nav-inicio">Início</a>
		<a class="blink" href="sobre.html" id="nav-sobre">Sobre</a>
		<a class="blink" href="https://github.com/fabi0casa">GitHub</a>
		</b>
		<button id="themeToggle">Trocar para Modo Escuro</button>
	</div>
</div>
<br>
<br>`;
            configureHeader();
        });
}

// Configura navegação ativa e tema no cabeçalho carregado
function configureHeader() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1).toLowerCase();

    if (page === 'index.html' || page === '') {
        const navInicio = document.getElementById('nav-inicio');
        if (navInicio) {
            navInicio.outerHTML = 'Início\n\t\t\t\t';
        }
    } else if (page === 'emulacao.html') {
        const navEmulacao = document.getElementById('nav-emulacao');
        if (navEmulacao) {
            navEmulacao.outerHTML = 'Emulação\n\t\t\t\t';
        }
    } else if (page === 'sobre.html') {
        const navSobre = document.getElementById('nav-sobre');
        if (navSobre) {
            navSobre.outerHTML = 'Sobre\n\t\t\t\t';
        }
    }

    if (typeof applyTheme === 'function') {
        const currentTheme = localStorage.getItem('theme') || 'light';
        applyTheme(currentTheme);
    }

    // Easter egg da logo do header
    const headerLogo = document.getElementById('header-logo') || document.querySelector('.home-download img');
    if (headerLogo) {
        const rand = Math.random();
        if (rand < 0.05) {
            // 5% de chance: shockwave.png com gradiente apenas em tons de laranja
            headerLogo.src = 'media/images/shockwave.png';
            headerLogo.className = 'logo-shockwave';
        } else if (rand < 0.075) {
            // 2,5% de chance (0.05 até 0.075): flash-icon.png com pulso lento de brilho
            headerLogo.src = 'media/images/flash-icon.png';
            headerLogo.className = 'logo-pulse';
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}

// ==========================================
// Easter Egg: Digitar 'tetris' em sequência
// ==========================================
(function setupTetrisEasterEgg() {
    let typedBuffer = '';
    let isEasterEggActive = false;

    window.addEventListener('keydown', function(event) {
        if (isEasterEggActive) return;

        // Ignora digitação dentro de inputs ou textareas
        const activeEl = document.activeElement;
        const tag = activeEl ? activeEl.tagName.toLowerCase() : '';
        if (tag === 'input' || tag === 'textarea' || (activeEl && activeEl.isContentEditable)) {
            return;
        }

        const key = event.key ? event.key.toLowerCase() : '';
        if (key.length === 1 && key >= 'a' && key <= 'z') {
            typedBuffer += key;
            if (typedBuffer.length > 10) {
                typedBuffer = typedBuffer.slice(-10);
            }

            if (typedBuffer.endsWith('tetris') || typedBuffer.endsWith('tetriz')) {
                isEasterEggActive = true;
                launchTetrisPopup();
            }
        }
    });

    function launchTetrisPopup() {
        // Toca a música do Tetris em loop
        const tetrisMusic = new Audio('media/songs/tetris.mp3');
        tetrisMusic.loop = true;
        tetrisMusic.play().catch(err => {
            console.warn('Aviso: Não foi possível reproduzir media/songs/tetris.mp3:', err);
        });

        // Carrega o CSS do Tetris se ainda não estiver na página
        if (!document.getElementById('tetris-stylesheet')) {
            const link = document.createElement('link');
            link.id = 'tetris-stylesheet';
            link.rel = 'stylesheet';
            link.href = 'css/tetris.css';
            document.head.appendChild(link);
        }

        // Cria o popup com a tela inteira sombreada
        const overlay = document.createElement('div');
        overlay.id = 'tetris-overlay';
        overlay.innerHTML = `
            <div class="tetris-popup-window">
                <div class="tetris-popup-header">
                    <img src="media/tetris/img/tetris_peca.png" class="tetris-piece-top" alt="">
                    <div class="tetris-logo-wrap">
                        <img src="media/tetris/img/tetris_logo2.png" class="tetris-logo" alt="Tetris">
                    </div>
                    <img src="media/tetris/img/tetris_peca.png" class="tetris-piece-top tetris-flip-h" alt="">
                </div>

                <div class="tetris-popup-middle">
                    <img src="media/tetris/img/tetris_peca3.png" class="tetris-piece-side" alt="">
                    <div class="tetris-game-frame">
                        <canvas id="tetris-canvas" width="200" height="400"></canvas>
                        <div class="tetris-pontuacao">
                            Pontuacao : <span id="tetris-score">0</span>
                        </div>
                    </div>
                    <img src="media/tetris/img/tetris_peca3.png" class="tetris-piece-side tetris-flip-h" alt="">
                </div>

                <div class="tetris-popup-footer">
                    <img src="media/tetris/img/tetris_peca.png" class="tetris-piece-bottom" alt="">
                    <div class="tetris-instructions">
                        Controles: &larr; &rarr; mover | &uarr; girar | &darr; descer
                    </div>
                    <img src="media/tetris/img/tetris_peca.png" class="tetris-piece-bottom tetris-flip-h" alt="">
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Carrega js/tetris.js dinamicamente e inicializa o jogo
        if (typeof window.initTetrisEasterEgg === 'function') {
            window.initTetrisEasterEgg();
        } else {
            const script = document.createElement('script');
            script.src = 'js/tetris.js';
            script.onload = function() {
                if (typeof window.initTetrisEasterEgg === 'function') {
                    window.initTetrisEasterEgg();
                }
            };
            document.body.appendChild(script);
        }
    }
})();

