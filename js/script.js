// Função para aplicar o tema
function applyTheme(theme) {
    if (document.body) {
        document.body.className = theme;
    }
    const button = document.getElementById('themeToggle');
    if (button) {
        button.textContent = theme === 'light' ? 'Trocar para Modo Escuro' : 'Trocar para Modo Claro';
    }
    const badge = document.getElementById('spritefusion-badge');
    if (badge) {
        badge.src = theme === 'light'
            ? 'https://destroy.spritefusion.com/badge-light.svg'
            : 'https://destroy.spritefusion.com/badge.svg';
    }
}

// Checar se há uma preferência de tema salva
const savedTheme = localStorage.getItem('theme');
const currentTheme = savedTheme ? savedTheme : 'light';
if (document.body) {
    applyTheme(currentTheme);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        applyTheme(currentTheme);
    });
}

// Alternar tema ao clicar no botão (delegação de evento para funcionar com o header carregado dinamicamente)
document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'themeToggle') {
        const newTheme = (document.body && document.body.className === 'light') ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }
});