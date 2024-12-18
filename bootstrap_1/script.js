// Funzione per salvare la risposta nel localStorage
function saveAnswer(questionId, answer) {
    localStorage.setItem(questionId, answer);
}

// Funzione per caricare la risposta dal localStorage
function loadAnswer(questionId) {
    return localStorage.getItem(questionId) || ''; // Se non c'è una risposta salvata, ritorna una stringa vuota
}

// Funzione per avviare il timer
let timeLeft = localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : 60 * 60;
let timerDisplay = document.getElementById('timer');

// Funzione per aggiornare il timer ogni secondo
function startTimer() {
    let timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.innerHTML = "Tempo scaduto!";
        } else {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            timerDisplay.innerHTML = minutes + ":" + seconds;
            timeLeft--;
            localStorage.setItem('timeLeft', timeLeft);
        }
    }, 1000);
}

// Avvia il timer se non è già partito
window.onload = function() {
    if (timeLeft > 0) {
        startTimer();
    }

    const questionId = document.body.id; // Usa l'ID del body per determinare quale domanda è caricata

    // Carica la risposta salvata nel localStorage
    const savedAnswer = loadAnswer(questionId);
    if (savedAnswer && document.getElementById(`textarea-${questionId}`)) {
        document.getElementById(`textarea-${questionId}`).value = savedAnswer;
    }

    // Salva la risposta mentre l'utente digita nel textarea
    if (document.getElementById(`textarea-${questionId}`)) {
        document.getElementById(`textarea-${questionId}`).addEventListener('input', function() {
            saveAnswer(questionId, this.value); // Salva la risposta nel localStorage
        });
    }

    // Gestisce il salvataggio delle risposte per le domande a scelta multipla
    const form = document.getElementById('quizForm');
    form.addEventListener('change', function(event) {
        if (event.target.type === 'radio') {
            const question = event.target.name;
            const answer = event.target.value;
            localStorage.setItem(question, answer); // Salva la risposta selezionata nel localStorage
        }
    });
};

// Funzione che raccoglie tutte le risposte dalle domande
function generaFileRisposte() {
    let risposte = '';

    // Definisci tutte le domande che vuoi raccogliere
    const domande = [
        { id: 'textarea-question1', label: '1. Cos\'è un algoritmo in informatica?' },
        { id: 'textarea-question2', label: '2. Cos\'è la "memoria RAM" in un computer?' },
        { id: 'textarea-question3', label: '3. Cos\'è il "cloud computing"?' },
        { label: 'QUIZ 1' },
        { id: 'q11', label: 'Cosa significa "informatica"?' },
        { id: 'q21', label: 'Quali sono alcuni dei principali settori dell\'informatica?' },
        { id: 'q31', label: 'Qual è l\'obiettivo principale dell\'informatica?' },
        { id: 'q41', label: 'In quale ambito l\'informatica ha influenzato maggiormente la vita quotidiana?' },
        { id: 'q51', label: 'Cosa combina il termine "informatica"?' },
        { label: 'QUIZ 2' },
        { id: 'q12', label: 'Cosa rappresenta una socket in informatica?' },
        { id: 'q22', label: 'Qual è il principale protocollo utilizzato dalle socket per garantire una comunicazione affidabile?' },
        { id: 'q32', label: 'Cosa identifica una socket su una rete?' },
        { id: 'q42', label: 'In quale situazione un server crea una socket?' },
        { id: 'q52', label: 'Qual è la differenza principale tra TCP e UDP nelle socket?' },
    ];

    // Raccogli le risposte per ogni domanda
    domande.forEach((domanda) => {
        let risposta = '';
        
        // Controllo per le risposte a scelta multipla (radio button)
        const selectedOption = document.querySelector(`input[name="${domanda.id}"]:checked`);
        if (selectedOption) {
            risposta = selectedOption.parentElement.textContent.trim();
        }
        // Controllo per le risposte testuali (textarea)
        else {
            const textarea = document.querySelector(`#${domanda.id}`);
            if (textarea) {
                risposta = textarea.value.trim();
            } else {
                risposta = 'Nessuna risposta';
            }
        }
        
        risposte += `${domanda.label}\nRisposta: ${risposta}\n\n`;
    });

    // Crea un Blob con le risposte
    const blob = new Blob([risposte], { type: 'text/plain' });

    // Crea un link per il download del file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'risposte_verifica.txt';
    link.click();
}

// Funzione per resettare il quiz
function resetQuiz() {
    // Ripristina il timer
    timeLeft = 60 * 60; // 1 ora
    localStorage.setItem('timeLeft', timeLeft);
    timerDisplay.innerHTML = "60:00"; // Imposta il timer a 1 ora
    startTimer(); // Avvia di nuovo il timer

    // Cancella le risposte dal localStorage
    localStorage.clear();

    // Ripristina tutte le risposte nel form
    const formElements = document.querySelectorAll('input[type="radio"], textarea');
    formElements.forEach(el => {
        if (el.type === 'radio') {
            el.checked = false;
        } else if (el.tagName === 'TEXTAREA') {
            el.value = '';
        }
    });
}

// Aggiungi l'evento per il tasto "Consegna"
function consegna() {
    generaFileRisposte();
}

// Aggiungi l'evento per il tasto "Reset"
document.getElementById('resetButton').addEventListener('click', resetQuiz);

