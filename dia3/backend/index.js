import express from 'express';
import cors from 'cors';

import Operacoes from './operacoes';
import Ativos from './ativos';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/operacoes', Operacoes);
app.use('/ativos', Ativos)

app.listen(3000, () =>
    console.log('Servidor rodando na porta 3000!'),
);