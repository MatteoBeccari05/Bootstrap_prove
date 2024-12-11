fetch('../json/server_client.json')
  .then(response => response.json())
  .then(data => {
    // Navbar
    const navbarLinks = data.navbar;
    const navbar = document.querySelector('nav .navbar-nav');
    navbar.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="../pages/index.html">${navbarLinks.home}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/socket.html">${navbarLinks.socket}</a></li>
      <li class="nav-item"><a class="nav-link active" href="../pages/server_client.html">${navbarLinks.server_client}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/pila_iso_osi.html">${navbarLinks.pila_iso_osi}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/stack_tcp_ip.html">${navbarLinks.stack_tcp_ip}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/isoosi_vs_tcpip.html">${navbarLinks.isoosi_vs_tcpip}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/glossario.html">${navbarLinks.glossario}</a></li>
    `;
    
    // Contenuto
    const content = data.content;
    const contentDiv = document.querySelector('.content .container');
    contentDiv.innerHTML = `
      <h1 class="text-center">${content.title}</h1>
      <p class="giustificato">${content.description}</p>

      <h2>${content.server.title}</h2>
      <p class="giustificato">${content.server.description}</p>

      <h2>${content.client.title}</h2>
      <p class="giustificato">${content.client.description}</p>

      <h2>${content.how_it_works.title}</h2>
      <ol class="giustificato">
        ${content.how_it_works.steps.map(step => `
          <li><b>${step.title}:</b> ${step.description}</li>
        `).join('')}
      </ol>

      <img src="${content.image}" class="img-fluid mb-4" alt="Diagramma Server-Client">
      <p class="text-center">Schema del modello Server-Client</p>

      <h2>Tipi di Server</h2>
      <ul class="giustificato">
        <li><b>Server Web:</b> Fornisce contenuti e risorse per siti web.</li>
        <li><b>Server Database:</b> Gestisce l'archiviazione e il recupero di dati strutturati.</li>
        <li><b>Server di Posta:</b> Gestisce l'invio e la ricezione di email.</li>
        <li><b>Server di File:</b> Permette la condivisione di file in una rete.</li>
      </ul>
    `;

    // Footer
    const footer = data.content.footer;
    const footerDiv = document.querySelector('footer');
    footerDiv.innerHTML = `
      <p>${footer.copyright} <img src="../images/logo.png" alt="WBSCHOOL Logo" style="height: 50px;"></p>
      <p>${footer.author}</p>
    `;
  })
  .catch(error => {
    console.error('Errore nel caricamento del file JSON:', error);
  });
