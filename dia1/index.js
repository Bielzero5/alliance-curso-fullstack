import express from 'express';
import calculadora from './calculadora';
import cors from 'cors';

const app = express();
<<<<<<< HEAD
app.use(express.json());
app.use(cors());

app.use('/calculadora', calculadora);

app.get('/axios.js', (req, res) => res.sendFile(__dirname + '/axios.js'));app.get('/axios.js', (req, res) => res.sendFile(__dirname + '/axios.js'));

app.listen(3000, () =>
    console.log('Servidor rodando na porta 30000!'),
);
=======

app.use(cors());

app.use(express.json())
app.use('/calculadora',calculadora);

app.get('/axios.js', (req, res) => res.sendFile(__dirname + '/axios.js'));
app.listen(3000, () =>
    console.log('Servidor rodando na porta 3000'),
 );
>>>>>>> 85526e5c703732a8c115ac4a5546642d938d78b4
