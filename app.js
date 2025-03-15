import express from 'express';
import movieRouter from './routers/movieRouter.js'; // Importiamo il router per le rotte dei film

const app = express(); // Creiamo un'istanza dell'applicazione Express

// Definiamo la porta su cui il server ascolterà, prendendola dall'ambiente o impostandola su 3000
const port = process.env.SERVER_PORT || 3000;

// Middleware per instradare tutte le richieste a /movies verso movieRouter
app.use('/movies', movieRouter); 

// Avviamo il server e lo mettiamo in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`Server Movies in funzione sulla porta: ${port}`);
});
