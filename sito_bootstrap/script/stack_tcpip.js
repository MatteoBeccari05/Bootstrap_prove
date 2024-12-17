
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


document.addEventListener('DOMContentLoaded', function () {
  
  fetch('../json/stack_tcpip.json') 
      .then(response => response.json())
      .then(data => {

          document.title = data.head.title;


          const navbarBrand = document.getElementById('navbarBrand');
          const brand = data.body.navbar.brand;
          navbarBrand.innerHTML = `
              <a class="navbar-brand" href="${brand.href}">
                  <img src="${brand.img_src}" alt="${brand.alt}" style="height: ${brand.height}">
              </a>
          `;

          const navbarLinks = data.body.navbar.links;
          const navbarLinksElement = document.getElementById('navbarLinks');
          navbarLinksElement.innerHTML = ''; 

          navbarLinks.forEach(link => {
              const linkElement = document.createElement('li');
              linkElement.classList.add('nav-item');
              
              const anchor = document.createElement('a');
              anchor.classList.add('nav-link');

              if (link.active) anchor.classList.add('active');
              
              anchor.href = link.href;
              anchor.textContent = link.label;
              
              linkElement.appendChild(anchor);
              navbarLinksElement.appendChild(linkElement);
          });

          const contentContainer = document.getElementById('contentContainer');
          const content = data.body.content;
          contentContainer.innerHTML = `
              <h1 class="text-center mb-4">${content.header.h1}</h1>
              ${content.sections.map(section => {
                  if (section.title) {
                      return `<h3>${section.title}</h3><p>${section.paragraph}</p>`;
                  } else if (section.img) {
                      return `<img src="${section.img.src}" alt="${section.img.alt}" class="${section.img.class}">`;
                  } else {
                      return `<p>${section.paragraph}</p>`;
                  }
              }).join('')}
          `;

          const footerContent = document.getElementById('footerContainer');
          const footer = data.body.footer;
          
          footerContent.innerHTML = `
              <p>${footer.content[0].text} 
                  <img src="${footer.content[0].img_src}" alt="${footer.content[0].alt}" style="height: ${footer.content[0].height};">
              </p>
              <p>${footer.content[1].text}</p>
          `;
      })
      .catch(error => {
          console.error('Error loading JSON:', error);
      });
});
