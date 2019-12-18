import express from 'express';
import cors from 'cors';

import usuarios from './usuarios'

import bicicletas from './bicicletas'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarios);
app.use('/bicicletas', bicicletas);
app.listen(3000, () =>
    console.log('Servidor rodando na porta 3000'),
 );