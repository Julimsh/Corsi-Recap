// MODELLO PER UN CORSO VUOTO
class Corsi {
    nome;
    durata;
    materia1;
    materia2;
    materia3;
    materia4;
    materia5;
    constructor(_nome, _durata, _materia1, _materia2, _materia3) {
        this.nome = _nome;
        this.durata = _durata;
        this.materia1 = _materia1;
        this.materia2 = _materia2;
        this.materia3 = _materia3;
    }
    corsoCompleto() {
        return `Corso di ${this.nome} della durata di ${this.durata}. <br>
        Le materie sono: ${this.materia1} ${this.materia2} ${this.materia3}`;
    }
}

$(document).ready(function() {
    //SVUOTAMENTO CAMPI
    $("#nomeNuovoCorso").val('')
    $("#durataNuovoCorso").val('')
    $("#materiaObbligatoria").val('')
    $("#materiaFacoltativa1").val('')
    $("#materiaFacoltativa2").val('')
    $("#nuoviCorsi").html('');

    if (localStorage.setItem != '') { // se c'è qualcosa nel localStorage (e quindi non è vuoto)
        $("#esci").removeClass("nav-link disabled"); // rimuovo la classe "disabilità" dal tasto logout
        $("#userMenu").html(" di " + localStorage.getItem("utente")); // aggiungo l'informazione del nome utente contenuta nel local Storage, al <div> predisposto nel Navbar
    }
    // BENVENUTO
    let utenteBenvenuto = localStorage.getItem("utente"); // nella variabile inserisco il dato contenuto nel localStorage
    $("#benvenuto").html("Benvenuto " + utenteBenvenuto); // messaggio di benvenuto personalizzato

    // FUNZIONE PER LOGOUT
    $("#esci").on("click", function() {
        localStorage.clear(); // pulisco il localStorage
        location.href = 'index.html'; // dirotto l'utente sulla pagina della Home
    });

    // DEFINIZIONE CORSI BASE
    var disegno = new Corsi("Disegno", "6 mesi", "Anatomia,", "Inchiostratura,", "Prospettiva");
    var animazione = new Corsi("Animazione", "3 mesi", "Sceneggiatura,", "Animazione,", "Cliffhanger e PlotTwist");
    var videogiochi = new Corsi("Videogiochi", "4 mesi", "Gestione degli Scenari,", "Gestione degli Achievement,", "PG, PNG e Mostri");

    $("#corso1").html(disegno.corsoCompleto());
    // posizionandomi sul #p aggiungo la funzione e traccia della Class "Corso"
    $("#corso2").html(animazione.corsoCompleto());
    $("#corso3").html(videogiochi.corsoCompleto());

    /////////////////////////// STEP 3 ///////////////////////////////

    // FUNZIONE AL BOTTONE inviaFormCorso
    $("#inviaFormCorso").on("click", function() {
        // Prendo i dati/valori dati dall'utente e li metto in delle variabili
        // "val ti dà il valore dell'istante in cui esegui il codice, non si aggiorna in automatico"
        let nomeNuovoCorso = $("#nomeNuovoCorso").val();
        let durataNuovoCorso = $("#durataNuovoCorso").val();
        let obbligatoria = $("#materiaObbligatoria").val();
        let facoltativa1 = $("#materiaFacoltativa1").val();
        let facoltativa2 = $("#materiaFacoltativa2").val();
        console.log(obbligatoria) // funziona, prende il valore
        if (nomeNuovoCorso != '' && durataNuovoCorso != '' && obbligatoria != '') {
            // se il campo della materia obbligatoria è stato riempito
            // e quindi lavariabile "obbligatorio" ha un valore
            aggiungiCorso(nomeNuovoCorso, durataNuovoCorso, obbligatoria, facoltativa1, facoltativa2);
            // invoco la funzione che inserisce il nuovo corso fatto dall'utente
            // come parametri gli passo i dati dell'utente che ho messo nelle variabili
        } else {
            alert("Inserisci i campi obbligatori")
        }
    }); // FINE FUNZIONE AL BOTTONE inviaFormCorso

    let corsiNew = []; // array per contenere i dati messi dall'utente

    // FUNZIONE per aggiungere concretamente un nuovo corso
    function aggiungiCorso(nomeNuovoCorso, durataNuovoCorso, obbligatoria, facoltativa1, facoltativa2) {
        // potevo usare anche altri nomi per le variabili, ma ancora mi confondo
        corsiNew.push(new Corsi(nomeNuovoCorso, durataNuovoCorso, obbligatoria, facoltativa1, facoltativa2));
        // metto i "dati dati dall'utente" nell'array con la traccia della Classe
        corsiNew.forEach((tempCorso) => {
            // per ogni elemento dell'array
            //$("#nuoviCorsi").html('');
            // cancello la LI precedente
            $("#nuoviCorsi").append($("<li></li>").html(tempCorso.corsoCompleto()));
            // posizionandomi sul #UL "appendo" il tag <li></li> 
            //a cui aggiungo "corso.corsoCompleto" per richiamare la funzione e traccia della Class "Corsi" 
            corsiNew = [];
        });
    } // FINE aggiungiCorso

    // FUNZIONE AL BOTTONE "cancellaCorsi", per cancellare i Corsi dell'utente
    $("#cancellaCorsi").on("click", function() {
        $("#nuoviCorsi").html('');
    });

    // FUNZIONE AL BOTTONE "cancellaFormCorso", per cancellare i campi del form
    $("#cancellaFormCorso").on("click", function() {
        $("#nomeNuovoCorso").val('')
        $("#durataNuovoCorso").val('')
        $("#materiaObbligatoria").val('')
        $("#materiaFacoltativa1").val('')
        $("#materiaFacoltativa2").val('')
    });

}); // FINE DOCUMENT READY