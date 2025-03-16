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
        // res.json(results);

        console.log(req.imagePath);

        const movies = results.map((movie) => { 
          return {
            ...movie,
            image: req.imagePath + movie.image,
          };
        });
    
        res.json(movies);
    });
}


// Funzione per ottenere un singolo film tramite ID
function show(req, res) {
    const { id } = req.params;

    // Controllo preliminare: assicuriamoci che id sia un numero valido
    if (isNaN(id)) {
        return res.status(400).json({
            status: 400,
            error: 'Bad Request',
            message: 'ID non valido'
        });
    }

    // Query per ottenere il film specifico
    const moviesSql = `SELECT * FROM movies WHERE id = ?`;

    connection.query(moviesSql, [id], (err, movieResults) => {
        if (err) {
            return res.status(500).json({
                error: 'Errore lato server nella funzione SHOW'
            });
        }

        if (movieResults.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'Not Found',
                message: 'Film non trovato'
            });
        }

        const movie = movieResults[0];

        // Query per ottenere le recensioni associate al film
        const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ?`;

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    error: 'Database error',
                    message: 'Errore nel recupero delle recensioni'
                });
            }

            // Aggiungiamo le recensioni al film
            movie.reviews = reviewsResults;
            
            res.json({
                ...movie,
                image: req.imagePath + movie.image
            });
            
        });
    });
}

// Funzione per eliminare un film tramite ID 
function destroy(req, res) {

    const { id } = req.params;
    
    const movieSql = 'DELETE FROM movies WHERE id = ?';

    // Eliminiamo il film 

    connection.query(movieSql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Database error'
            });
        }

        // Se nessuna riga è stata eliminata, significa che il film non esiste già o è stato già cancellato
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                error: 'Not Found',
                message: 'film non trovato o già eliminato'
            });
        }

        res.json({
            status: 204,
            message: 'Post eliminato con successo'
        });
    })
}

// Esportiamo le funzioni per poterle usare in altri file
export {
    index,
    show,
    destroy
};
