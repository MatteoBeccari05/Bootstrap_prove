document.addEventListener('DOMContentLoaded', function () {
    // Impedisci la copia del testo
    document.body.addEventListener('copy', (event) => {
        event.preventDefault();
        console.warn('Copia del testo non consentita!');
    });
    document.body.style.userSelect = 'none';
    document.body.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        console.warn('Clic destro disabilitato!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/pila_isoosi.json')
        .then(response => response.json())
        .then(data => {
            // titolo della pagina
            document.title = data.title;

            // navbar
            const navbar = document.querySelector('nav');
            navbar.innerHTML = `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="${data.navbar.brand.href}">
                            <img src="${data.navbar.brand.logo}" alt="${data.navbar.brand.alt}" style="height: ${data.navbar.brand.height};">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                ${data.navbar.items.map(item => `
                                    <li class="nav-item">
                                        <a class="nav-link ${item.active ? 'active' : ''}" href="${item.href}">${item.text}</a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </nav>
            `;

            // contenuto principale
            const contentDiv = document.querySelector('.content');
            contentDiv.innerHTML = `
                <div class="container mt-5">
                    <h1 class="text-center mb-4">${data.content.header.title}</h1>
                    <p class="giustificato">${data.content.header.description}</p>
                    <h3>I 7 Livelli della Pila ISO/OSI</h3>
                    <p class="giustificato">La pila ISO/OSI è composta da sette livelli, che vanno dal livello fisico al livello applicativo. Ecco una panoramica di ciascun livello:</p>
                    <ul class="giustificato">
                        ${data.content.levels.map(level => `
                            <li><strong>${level.title}</strong> - ${level.description}${level.link ? ` <a href="${level.link}" target="_blank">${level.example ? 'Leggi di più' : 'Ulteriori informazioni'}</a>` : ''}${level.example ? ` Esempi: ${level.example}` : ''}</li>
                        `).join('')}
                    </ul>
                    <img src="${data.content.image.src}" class="img-fluid" alt="${data.content.image.alt}">
                    <p class="text-center">Schema del modello ISO/OSI</p>
                </div>
            `;

            // footer
            const footer = document.querySelector('footer');
            footer.innerHTML = `
                <p>${data.footer.text} <img src="${data.footer.logo}" alt="WBSCHOOL Logo" style="height: 50px;"></p>
                <p>${data.footer.author}</p>
            `;
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});
