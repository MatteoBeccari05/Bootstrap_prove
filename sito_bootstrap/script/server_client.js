fetch('../json/server_client.json')
  .then(response => response.json())
  .then(data => {
    // Navbar: direttamente dal JSON (si trova dentro "content.navbar")
    const navbarHTML = data.content.navbar;
    const navbar = document.querySelector('nav .navbar-nav');
    navbar.innerHTML = navbarHTML;
    
    // Contenuto
    const content = data.content;
    const contentDiv = document.querySelector('.content .container');
    contentDiv.innerHTML = `
      <h1 class="text-center">${content.title}</h1>
      <p class="text-justify">${content.description}</p>

      <h2>${content.server.title}</h2>
      <p class="text-justify">${content.server.description}</p>

      <h2>${content.client.title}</h2>
      <p class="text-justify">${content.client.description}</p>

      <h2>${content.how_it_works.title}</h2>
      <ol class="text-justify">
        ${content.how_it_works.steps.map(step => `
          <li><b>${step.title}:</b> ${step.description}</li>
        `).join('')}
      </ol>

      <img src="${content.image}" class="img-fluid mb-4" alt="Diagramma Server-Client">
      <p class="text-center">Schema del modello Server-Client</p>

      <h2>Tipi di Server</h2>
      <ul class="text-justify">
        <li><b>Server Web:</b> Fornisce contenuti e risorse per siti web.</li>
        <li><b>Server Database:</b> Gestisce l'archiviazione e il recupero di dati strutturati.</li>
        <li><b>Server di Posta:</b> Gestisce l'invio e la ricezione di email.</li>
        <li><b>Server di File:</b> Permette la condivisione di file in una rete.</li>
      </ul>
    `;

    // Footer: direttamente dal JSON (si trova dentro "content.footer")
    const footerHTML = content.footer.content;
    const footerDiv = document.querySelector('footer');
    footerDiv.innerHTML = footerHTML;
  })
  .catch(error => {
    console.error('Errore nel caricamento del file JSON:', error);
  });
