import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/', async (req, res) => {
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let queryResult = await client.query("select CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO from public.CARTEIRA");
        for (let row of queryResult.rows) {
            resultado.push({
                codigo_ativo: row.codigo_ativo,
                quantidade: row.quantidade,
                preco_medio: row.preco_medio
            });
            console.log(resultado[-1]);
        }
    await client.end();

    res.send(JSON.stringify(resultado));
});

// Entrada é:
// payload = {nome: string, telefone: string, email: string, saldoCreditos: numerico}
router.post('/', async (req, res) => {
    const client = criaClient();
    await client.connect();
    let queryResult = await client.query(" select CODIGO_ATIVO from CARTEIRA where CODIGO_ATIVO = 1"); 
        if (queryResult.rows >= 1 ) {
            let payload = req.body;
            let sql = `insert into CARTEIRA(CODIGO_ATIVO, QUANTIDADE, PRECO_MEDIO) VALUES
            ('${payload.codigo_ativo}',${payload.quantidade},${payload.preco_medio})`;
            let sqlO = `insert into OPERACOES ( ID, CODIGO_ATIVO, QUANTIDADE, PRECO, TIPO) VALUES
            (nextval('SEQ_OPERACOES_ID'),'${payload.codigo_ativo}',${payload.quantidade},${payload.preco_medio}, 'C')`;
            
        };
    
    await client.query(sql);
    await client.end();
    res.status(201);
    res.send();
});

// Entrada é:
// payload = {nome: string, telefone: string, email: string, saldoCreditos: numerico}
router.put('/:codigo', async (req, res) => {
    let codigo = req.params.codigo_ativo;
    const client = criaClient();
    await client.connect();
    let payload = req.body;

        if (payload.tipo === 'V') {
            let sql = `insert into OPERACOES(CODIGO_ATIVO, QUANTIDADE, PRECO, TIPO) VALUES
            (nextval('SEQ_OPERACOES_ID'),'${payload.codigo_ativo}',${payload.quantidade},${payload.preco},'${payload.tipo}')`;
            
            let queryResult = await client.query(" select QUANTIDADE from CARTEIRA");
        } else {
                let sql = `insert into OPERACOES(CODIGO_ATIVO, QUANTIDADE, PRECO, TIPO) VALUES
                (nextval('SEQ_OPERACOES_ID'),'${payload.codigo_ativo}',${payload.quantidade},${payload.preco},'${payload.tipo}')`;
            };
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
});

function criaClient() {
    return new Client({
        user: 'dia3',
        host: 'localhost',
        database: 'db_dia5',
        password: '1234',
        port: 5432
    });
}

export default router;