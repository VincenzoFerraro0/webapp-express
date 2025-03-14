import connection from '../data/db.js'; // Importiamo la connessione al database

// Funzione per ottenere tutti i film dal database
function index(req, res) {
    const sql = "SELECT * FROM movies"; // Query SQL per selezionare tutti i film
    
    connection.query(sql, (err, results) => {
        if (err) {
            // Se c'è un errore, restituiamo una risposta con status 500 (errore server)
            return res.status(500).json({
                error: 'Errore lato server nella funzione INDEX'
            });
        }

        // Se la query va a buon fine, restituiamo i risultati in formato JSON
        res.json(results);
    });
}

// Funzione per ottenere un singolo film tramite ID (da implementare)
function show(req, res) {
    // TODO: Implementare la logica per recuperare un singolo film dal database
}

// Funzione per eliminare un film tramite ID (da implementare)
function destroy(req, res) {
    // TODO: Implementare la logica per eliminare un film dal database
}

// Esportiamo le funzioni per poterle usare in altri file
export {
    index,
    show,
    destroy
};
