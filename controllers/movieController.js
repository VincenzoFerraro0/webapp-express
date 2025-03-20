import connection from '../data/db.js'; // Importa la connessione al database

// Funzione per recuperare tutti i film
function index(req, res) {
    const sql = "SELECT * FROM movies"; // Query SQL per selezionare tutti i film

    connection.query(sql, (err, results) => {
        if (err) {
            // Se c'è un errore durante la query, restituiamo una risposta con status 500 (errore server)
            return res.status(500).json({
                error: 'Errore lato server nella funzione INDEX'
            });
        }

        // Log per verificare la presenza di 'imagePath' nella richiesta
        console.log(req.imagePath);

        // Mappiamo i risultati aggiungendo l'URL dell'immagine
        const movies = results.map((movie) => {
            return {
                ...movie,  // Manteniamo tutte le proprietà del film
                image: req.imagePath + movie.image,  // Aggiungiamo il percorso dell'immagine
            };
        });

        // Restituiamo i film con i percorsi delle immagini modificati in formato JSON
        res.json(movies);
    });
}

// Funzione per recuperare i dettagli di un singolo film
function show(req, res) {
    const { id } = req.params;  // Estraiamo l'ID del film dai parametri della richiesta

    // Controllo preliminare per assicurarsi che l'ID sia un numero valido
    if (isNaN(id)) {
        return res.status(400).json({
            status: 400,
            error: 'Bad Request',
            message: 'ID non valido'  // Se l'ID non è valido, restituiamo un errore 400
        });
    }

    // Query per ottenere i dettagli del film specifico in base all'ID
    const moviesSql = `SELECT * FROM movies WHERE id = ?`;

    connection.query(moviesSql, [id], (err, movieResults) => {
        if (err) {
            return res.status(500).json({
                error: 'Errore lato server nella funzione SHOW'  // Gestiamo gli errori della query
            });
        }

        if (movieResults.length === 0) {
            // Se non esiste un film con quell'ID, restituiamo un errore 404
            return res.status(404).json({
                status: 404,
                error: 'Not Found',
                message: 'Film non trovato'
            });
        }

        const movie = movieResults[0];  // Recuperiamo il film trovato

        // Query per ottenere le recensioni associate a questo film
        const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ?`;

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    error: 'Database error',
                    message: 'Errore nel recupero delle recensioni'  // Gestiamo gli errori della query delle recensioni
                });
            }

            // Aggiungiamo le recensioni al film
            movie.reviews = reviewsResults;

            // Restituiamo il film con le recensioni in formato JSON
            res.json({
                ...movie,  // Manteniamo tutte le proprietà del film
                image: req.imagePath + movie.image  // Aggiungiamo il percorso dell'immagine
            });
        });
    });
}

// Funzione per memorizzare una nuova recensione
function storeReview(req, res) {
    const { id } = req.params;  // Estraiamo l'ID del film dai parametri della richiesta

    const { text, name, vote } = req.body;  // Estraiamo i dati della recensione dal corpo della richiesta

    const sql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?,?,?,?)';  // Query per inserire la recensione

    connection.query(sql, [text, name, vote, id], (err, results) => {
        if (err) {
            // Se c'è un errore durante l'inserimento della recensione, restituiamo un errore 500
            return res.status(500).json({
                error: 'Database Errore StorrReviews'
            });
        }

        // Restituiamo una risposta con il messaggio di successo e l'ID della recensione appena inserita
        res.status(201);
        res.json({
            message: 'review added',
            id: results.insertId,  // ID della recensione appena creata
        });
    });
}

//funzione per Aggiungere un nuovo film 
function store(req, res) {

    const { title, director, genre, relase_year, abstract } = req.body;

    const imageName = `${req.file.filename}`;

    const sql = `INSERT INTO movies
                    (title, director, image, genre, relase_year, abstract )
                    VALUES (?,?,?,?,?,?)
                 `;
    connection.query(sql[title, director, imageName, genre, relase_year, abstract], (err, results) => {
        if(err) return res.status(500).json({
            error: 'database Error Store'
        });
        res.status(201).json({
            status: "success",
            message: "Film Aggiunto con successo",
            id: results.insertId
        });
    });
}

// Funzione per eliminare un film
function destroy(req, res) {
    const { id } = req.params;  // Estraiamo l'ID del film dai parametri della richiesta

    const movieSql = 'DELETE FROM movies WHERE id = ?';  // Query per eliminare il film con quell'ID

    connection.query(movieSql, [id], (err, results) => {
        if (err) {
            // Se c'è un errore durante l'eliminazione, restituiamo un errore 500
            return res.status(500).json({
                error: 'Database error'
            });
        }

        // Se nessuna riga è stata eliminata, significa che il film non esiste o è già stato eliminato
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                error: 'Not Found',
                message: 'Film non trovato o già eliminato'
            });
        }

        // Restituiamo una risposta di successo con il codice di stato 204
        res.json({
            status: 204,
            message: 'Film eliminato con successo'
        });
    });
}

// Esportiamo le funzioni per utilizzarle altrove
export {
    index,
    show,
    destroy,
    storeReview,
    store
};
