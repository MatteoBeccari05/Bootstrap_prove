// Funzione per caricare il contenuto del glossario dal file JSON
fetch('../json/glossario.json')
    .then(response => response.json())
    .then(data => {
        const accordionContainer = document.getElementById('glossaryAccordion');
        data.glossario.forEach((item, index) => {
            // Creazione dell'elemento per ogni voce del glossario
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');
            
            // Creazione dell'intestazione per l'accordion
            const accordionHeader = document.createElement('h2');
            accordionHeader.classList.add('accordion-header');
            accordionHeader.id = `heading${index + 1}`;
            
            // Creazione del pulsante per l'apertura dell'accordion
            const button = document.createElement('button');
            button.classList.add('accordion-button');
            button.type = 'button';
            button.setAttribute('data-bs-toggle', 'collapse');
            button.setAttribute('data-bs-target', `#collapse${index + 1}`);
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', `collapse${index + 1}`);
            
            // Impostiamo il nome da visualizzare come "term" o "title" in base ai dati
            const term = item.term || item.title;  // Se 'term' non esiste, usa 'title'
            button.innerHTML = term;
            
            // Aggiungi il pulsante all'intestazione
            accordionHeader.appendChild(button);
            accordionItem.appendChild(accordionHeader);
            
            // Creazione della parte che si espande (collapsable)
            const accordionCollapse = document.createElement('div');
            accordionCollapse.id = `collapse${index + 1}`;
            accordionCollapse.classList.add('accordion-collapse', 'collapse');
            accordionCollapse.setAttribute('aria-labelledby', `heading${index + 1}`);
            accordionCollapse.setAttribute('data-bs-parent', '#glossaryAccordion');
            
            // Creazione del corpo dell'accordion
            const accordionBody = document.createElement('div');
            accordionBody.classList.add('accordion-body');
            
            // Impostiamo la descrizione del glossario, che può essere un HTML per alcuni dati
            const description = item.description || item.content; // Usa 'description' o 'content' in base alla voce
            accordionBody.innerHTML = description;
            
            // Aggiungi il corpo dell'accordion alla sezione espandibile
            accordionCollapse.appendChild(accordionBody);
            accordionItem.appendChild(accordionCollapse);
            
            // Aggiungi l'elemento dell'accordion al contenitore principale
            accordionContainer.appendChild(accordionItem);
        });
    })
    .catch(error => {
        console.error('Errore nel caricamento del glossario:', error);
    });
