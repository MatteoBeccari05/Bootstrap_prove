// Funzione per ottenere i dettagli del prodotto dal file JSON
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Ottieni l'ID del prodotto dalla URL

    // Carica il file JSON con i dati dei prodotti
    const response = await fetch('../json/prodotti.json');
    const products = await response.json();

    // Trova il prodotto corrispondente all'ID
    const product = products.find(p => p.id == productId);

    if (product) {
        // Aggiungi i dettagli del prodotto alla pagina
        const productDetailsHTML = `
        <div class="row">
            <!-- Colonna per l'immagine del prodotto -->
            <div class="col-md-6">
                <img id="product-image" src="${product.images[product.colors[0].toLowerCase()]}" alt="${product.name}" class="img-fluid rounded product-image">
            </div>
            <!-- Colonna per le specifiche e descrizioni -->
            <div class="col-md-6">
                <h2 class="product-title">${product.name}</h2>
                <p><strong>Processore:</strong> ${product.processor}</p>
                <p><strong>Display:</strong> ${product.display}</p>
                <p><strong>Memoria:</strong> ${product.storage}</p>
                <p class="product-description"><strong>Descrizione:</strong> ${product.description}</p>
                
                <!-- Selezione del colore -->
                <div class="form-group">
                    <label for="color-select">Scegli il colore:</label>
                    <select id="color-select" class="form-select color-select">
                        ${product.colors.map(color => `<option value="${color.toLowerCase()}">${color}</option>`).join('')}
                    </select>
                </div>
    
                <!-- Prezzo in grande e verde -->
                <div class="product-price-container">
                    <p class="product-price">${product.price}</p>
                </div>
    
                <!-- Aggiungi al carrello -->
                <button class="btn btn-success mt-4" id="add-to-cart-btn">Aggiungi al carrello</button>
            </div>
        </div>
    `;
    
    document.getElementById('product-details').innerHTML = productDetailsHTML;

        // Aggiungere l'evento per cambiare l'immagine
        const colorSelect = document.getElementById('color-select');
        colorSelect.addEventListener('change', (event) => {
            const selectedColor = event.target.value.toLowerCase(); // Ottieni il colore selezionato

            // Trova l'immagine corrispondente al colore selezionato
            const selectedImage = product.images[selectedColor];

            // Se l'immagine corrispondente è trovata, aggiorna l'elemento immagine
            if (selectedImage) {
                document.getElementById('product-image').src = selectedImage;
            }
        });
    } else {
        document.getElementById('product-details').innerHTML = "<p>Prodotto non trovato.</p>";
    }
}

// Carica i dettagli del prodotto quando la pagina viene caricata
window.addEventListener('load', loadProductDetails);



