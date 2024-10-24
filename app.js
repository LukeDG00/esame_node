const express = require('express');
const uuid = require('uuid'); 

const app = express();

const port = 3000;
let libri = [];

// Test 

app.get("/", (req, res) => {
    res.json(
        {
            message: "Hello World!"
        }
    );
})


app.get('/libri', (req, res) => {
    res.json(libri);
})


app.get('/libri/:codice', (req, res) => {
    const libro = libri.find(b => b.codice === req.params.codice);
    if (libro) {
        res.json(libro);
    } else {
        res.status(404).json({ message: 'Libro non trovato' });
    }
})


app.post('/libri', (req, res) => {
    const { nome, descrizione, quantità, prezzo, autore } = req.body;

    
    const nuovoLibro = {
        codice: uuid.v1(),  
        nome,
        descrizione,
        quantità,
        prezzo,
        autore
    };

    libri.push(nuovoLibro);  
    res.status(201).json(nuovoLibro); 
})


app.delete('/libri/:codice', (req, res) => {
    const codice = req.params.codice;
    const index = libri.findIndex(b => b.codice === codice);

    if (index !== -1) {
        const libroRimosso = libri.splice(index, 1); 
        res.json({ message: 'Libro eliminato', libro: libroRimosso });
    } else {
        res.status(404).json({ message: 'Libro non trovato' });
    }
})


app.get('/libri/:codice/incrementa', (req, res) => {
    const libro = libri.find(b => b.codice === req.params.codice);

    if (libro) {
        libro.quantità += 1;
        res.json(libro);
    } else {
        res.status(404).json({ message: 'Libro non trovato' });
    }
})


app.get('/libri/:codice/decrementa', (req, res) => {
    const libro = libri.find(b => b.codice === req.params.codice);

    if (libro) {
        if (libro.quantità > 0) {
            libro.quantità -= 1;
            res.json(libro);
        } else {
            res.status(400).json({ message: 'Quantità insufficiente' });
        }
    } else {
        res.status(404).json({ message: 'Libro non trovato' });
    }
})




const server = app.listen(port, () => {
    console.log("Sono in ascolto")
})

const close = () => {
    server.close();
}

module.exports = {app, close}

