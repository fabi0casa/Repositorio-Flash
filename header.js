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
			<img src="images/flash.png" style="width: 100px; height: 100px; margin-right: 10px;">
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
