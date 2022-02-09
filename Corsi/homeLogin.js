$(document).ready(function() {
    // SVUOTO I CAMPI
    $("#user").val('')
    $("#email").val('')
    $("#password").val('')

    // FUNZIONE AL BOTTONE
    $("#entra").on("click", function() {

        // Prendo i valori dati dall'utente
        let utente = $("#user").val();
        let email = $("#email").val();
        let password = $("#password").val();
        // variabili per funzioni di controllo standard
        const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,4})+$/;
        const regexPass = /[0-9]/;

        // Campi di controllo
        if (utente == '' || password == '' || email == '') { // se i campi non sono vuoti
            alert("Inserire nome utente, password ed una email valida");
        } else if (password.length < 6 || !regexPass.test(password)) { // controllo password
            alert("La password deve essere almeno di 6 caratteri e contenere un Numero");
        } else if (!regex.test(email)) { // controllo email
            alert("Inserire una email valida");
        } else { // Se tutto va bene invoca "partenza"
            partenza()
        }

        // FUNZIONE di partenza per la progressbar
        function partenza() {
            let progressBar = $("#progress");
            var larghezza = 1;
            let intervallo = setInterval(cresci, 5);

            function cresci() {
                if (larghezza > 300) {
                    clearInterval(intervallo); // pulisco il setInterval
                    location.href = "elencoCorsi.html"; // dirotto l'utente sulla pagina dei corsi
                } else { // altrimenti
                    larghezza++;
                    progressBar.css("width", larghezza + "px");
                    localStorage.setItem("utente", utente);

                }
            }
        }
    })

});