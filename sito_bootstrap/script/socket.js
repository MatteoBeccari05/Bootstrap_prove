fetch('../json/socket.json')
  .then(response => response.json())
  .then(data => {
    // Navbar
    const navbarLinks = data.navbar;
    const navbar = document.querySelector('nav .navbar-nav');
    navbar.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="../pages/index.html">${navbarLinks.home}</a></li>
      <li class="nav-item"><a class="nav-link active" href="../pages/socket.html">${navbarLinks.socket}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/server_client.html">${navbarLinks.server_client}</a></li>
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

      <h3>${content.socket_types.title}</h3>
      <p>Esistono due tipi principali di socket utilizzati per la comunicazione in rete:</p>
      <ul class="giustificato">
        ${content.socket_types.list.map(socket => `
          <li><b>${socket.name}:</b> ${socket.description}</li>
        `).join('')}
      </ul>

      <img src="${content.image}" class="img-fluid mb-4" alt="Diagramma Client-Server Socket">
      <p class="text-center">Schema di una comunicazione Client-Server tramite socket</p>

      <h3>${content.process.title}</h3>
      <ol class="giustificato">
        ${content.process.steps.map(step => `
          <li><b>${step.title}:</b> ${step.description}</li>
        `).join('')}
      </ol>

      <h3>${content.examples.title}</h3>
      <ul class="giustificato">
        ${content.examples.list.map(example => `
          <li><b>${example.name}:</b> ${example.description}</li>
        `).join('')}
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
