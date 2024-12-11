fetch('../json/stack_tcpip.json')
  .then(response => response.json())
  .then(data => {
    // Navbar
    const navbarLinks = data.navbar;
    const navbar = document.querySelector('nav .navbar-nav');
    navbar.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="../pages/index.html">${navbarLinks.home}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/socket.html">${navbarLinks.socket}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/server_client.html">${navbarLinks.server_client}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/pila_iso_osi.html">${navbarLinks.pila_iso_osi}</a></li>
      <li class="nav-item"><a class="nav-link active" href="../pages/stack_tcp_ip.html">${navbarLinks.stack_tcp_ip}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/isoosi_vs_tcpip.html">${navbarLinks.isoosi_vs_tcpip}</a></li>
      <li class="nav-item"><a class="nav-link" href="../pages/glossario.html">${navbarLinks.glossario}</a></li>
    `;
    
    // Contenuto
    const content = data.content;
    const contentDiv = document.querySelector('.content .container');
    contentDiv.innerHTML = `
      <h1 class="text-center mb-4">${content.title}</h1>
      <p class="giustificato">${content.description}</p>

      ${content.layers.map(layer => `
        <h3>${layer.title}</h3>
        <p class="giustificato">${layer.description}</p>
      `).join('')}

      <img src="${content.image}" alt="Livello Accesso alla Rete" class="img-fluid mb-4">

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

