
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
    // Avvia il timer se non è già partito
    if (timeLeft > 0) {
        startTimer();
    }

    // Identifica la domanda corrente basata sull'ID della pagina
    const questionId = document.body.id; // Usa l'ID del body per determinare quale domanda è caricata

    // Carica la risposta salvata per la domanda corrente, se esiste
    const savedAnswer = loadAnswer(questionId);

    // Se la domanda è stata caricata correttamente e la risposta esiste, la carica nella textarea
    if (savedAnswer && document.getElementById(`textarea-${questionId}`)) {
        document.getElementById(`textarea-${questionId}`).value = savedAnswer;
    }

    // Ascolta l'input per salvare automaticamente la risposta
    if (document.getElementById(`textarea-${questionId}`)) {
        document.getElementById(`textarea-${questionId}`).addEventListener('input', function() {
            saveAnswer(questionId, this.value); // Salva la risposta nel localStorage ogni volta che l'utente scrive
        });
    }

    const savedAnswers = {
        q11: localStorage.getItem('q11') || '',
        q21: localStorage.getItem('q21') || '',
        q31: localStorage.getItem('q31') || '',
        q41: localStorage.getItem('q41') || '',
        q51: localStorage.getItem('q51') || '',
        q12: localStorage.getItem('q12') || '',
        q22: localStorage.getItem('q22') || '',
        q32: localStorage.getItem('q32') || '',
        q42: localStorage.getItem('q42') || '',
        q52: localStorage.getItem('q52') || '',
    };

    // Se ci sono risposte salvate, le seleziona
    const form = document.getElementById('quizForm');
    form.addEventListener('change', function(event) {
        if (event.target.type === 'radio') {
            const question = event.target.name; // 'q1', 'q2', etc.
            const answer = event.target.value;
            localStorage.setItem(question, answer); // Salva la risposta selezionata nel localStorage
        }
    });

    // Seleziona le risposte precedentemente salvate
    for (let question in savedAnswers) {
        const selectedValue = savedAnswers[question];
        if (selectedValue) {
            const radioButton = document.querySelector(`input[name="${question}"][value="${selectedValue}"]`);
            if (radioButton) {
                radioButton.checked = true; // Seleziona la risposta salvata
            }
        }
    }

};




