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
