import express from 'express';

const router = express.Router();

// Importiamo i metodi dal controller dei film
import { index, show, destroy } from '../controllers/movieController.js';

// Rotta per ottenere la lista di tutti i film
router.get('/', index);

// Rotta per ottenere i dettagli di un singolo film tramite ID
router.get('/:id', show);

// Rotta per eliminare un film tramite ID
router.delete('/:id', destroy);

// Esportiamo il router per poterlo utilizzare in altre parti dell'applicazione
export default router;
