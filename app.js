import express from 'express';
import movieRouter from './routers/movieRouter.js'; // Importiamo il router per le rotte dei film
import imagePathMiddleware from './middlewares/imagePath.js';
import cors from 'cors'
const app = express(); // Creiamo un'istanza dell'applicazione Express

// Definiamo la porta su cui il server ascolterà, prendendola dall'ambiente o impostandola su 3000
const port = process.env.SERVER_PORT || 3000;

// Middleware
app.use( express.static('public') ) //middleware per gestire asset statici
app.use( express.json() ) //middleware per gestire le informazioni del body
app.use( imagePathMiddleware ) //middleware per gestione delle immagini
//CORS
app.use(cors({
    origin: process.env.FRONTEND_APP
    
}))
//ROTTE
app.get('/', (req, res) => res.send('Server attivo!'));

app.use('/movies', movieRouter);

// Avviamo il server e lo mettiamo in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`Server Movies in funzione sulla porta: ${port}`);
});
