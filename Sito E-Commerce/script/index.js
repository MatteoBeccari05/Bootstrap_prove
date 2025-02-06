// Funzione per caricare il JSON
async function loadData() {
    // Carica il JSON da un file locale o da un'API
    const response = await fetch('../json/index.json');
    const jsonData = await response.json();
  
    // Imposta il titolo della pagina
    document.title = jsonData.title;
  
    // Aggiungi il contenuto head
    const head = document.querySelector('head');
  
    // Meta tags
    jsonData.head.meta.forEach(metaTag => {
      const metaElement = document.createElement('meta');
      for (const key in metaTag) {
        metaElement.setAttribute(key, metaTag[key]);
      }
      head.appendChild(metaElement);
    });
  
    // Link CSS
    jsonData.head.links.forEach(link => {
      const linkElement = document.createElement('link');
      for (const key in link) {
        linkElement.setAttribute(key, link[key]);
      }
      head.appendChild(linkElement);
    });
  
    // Aggiungi il contenuto del body
    const body = document.querySelector('body');
  
    // Aggiungi la navbar
    const nav = document.createElement('nav');
    nav.className = jsonData.body.nav.class;
  
    // Creazione del contenuto della navbar
    const container = document.createElement('div');
    container.className = "container-fluid";
    container.innerHTML = `
      <a class="navbar-brand" href="${jsonData.body.nav.container.logo.href}">
        <img src="${jsonData.body.nav.container.logo.img.src}" alt="${jsonData.body.nav.container.logo.img.alt}" style="${jsonData.body.nav.container.logo.img.style}">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          ${jsonData.body.nav.container.collapse.ul.items.map(item => `
            <li class="nav-item">
              <a class="${item.class}" href="${item.href}" ${item['aria-current'] ? 'aria-current="page"' : ''}>${item.text}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    nav.appendChild(container);
    body.appendChild(nav);
  
    // Aggiungi il titolo principale (h1)
    const h1 = document.createElement('h1');
    h1.textContent = jsonData.body.h1;
    body.appendChild(h1);
  
    // Aggiungi paragrafo di benvenuto
    const p = document.createElement('p');
    p.className = jsonData.body.p.class;
    p.innerHTML = jsonData.body.p.text;
    body.appendChild(p);
  
    // Crea le card
    const cardDeck = document.createElement('div');
    cardDeck.className = 'card-deck';
  
    jsonData.body.cards.items.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = card.class;
      cardElement.style = card.style;
  
      cardElement.innerHTML = `
        <img class="${card.img.class}" src="${card.img.src}" alt="${card.img.alt}">
        <div class="card-body">
          <h5 class="card-title">${card.body.h5}</h5>
          <p class="card-text">${card.body.p}</p>
          <a href="${card.body.a.href}" class="${card.body.a.class}">${card.body.a.text}</a>
        </div>
      `;
      cardDeck.appendChild(cardElement);
    });
  
    body.appendChild(cardDeck);
  
    // Aggiungi le offerte lampo
    const offersTitle = document.createElement('h2');
    offersTitle.textContent = jsonData.body.h2;
    body.appendChild(offersTitle);

    const offerDeck = document.createElement('div');
    offerDeck.className = 'card-deck';

    jsonData.body.offers.items.forEach(offer => {
    const offerElement = document.createElement('div');
    offerElement.className = offer.class;
    offerElement.style = offer.style;

    offerElement.innerHTML = `
        <img class="${offer.img.class}" src="${offer.img.src}" alt="${offer.img.alt}">
        <div class="card-body">
        <h5 class="card-title">${offer.body.h5}</h5>
        <p class="card-text">${offer.body.p}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <a href="${offer.body.a.href}" class="${offer.body.a.class}">${offer.body.a.text}</a>
            <p class="price" style="margin-left: 20px; font-weight: bold;">${offer.body.price}</p>
        </div>
        </div>
    `;
    offerDeck.appendChild(offerElement);
    });

    body.appendChild(offerDeck);




  
    // Aggiungi footer
    const footer = document.createElement('footer');
    footer.className = jsonData.body.footer.class;
    footer.innerHTML = `<p>${jsonData.body.footer.p}</p>`;
    body.appendChild(footer);
  
    // Aggiungi i file script
    jsonData.scripts.forEach(script => {
      const scriptElement = document.createElement('script');
      scriptElement.src = script.src;
      if (script.integrity) {
        scriptElement.integrity = script.integrity;
      }
      if (script.crossorigin) {
        scriptElement.crossorigin = script.crossorigin;
      }
      document.body.appendChild(scriptElement);
    });
  }
  
  // Chiamata alla funzione di caricamento dei dati
  loadData();
  