import express from 'express';

const app = express(); // Creiamo un'istanza di un'applicazione Express

// Definiamo la porta su cui il server ascolterà, prendendola dall'ambiente o impostandola su 3000
const port = process.env.SERVER_PORT || 3000;

// Avviamo il server e facciamo in modo che ascolti sulla porta definita
app.listen(port, () => {
    console.log(`Server Movies in funzione sulla porta: ${port}`);
});
