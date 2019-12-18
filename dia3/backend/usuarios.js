import { Router } from 'express'
import { Client } from 'pg'

const router = Router(); 

router.get('/', async (req,res) => {
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let query = await client.query("select CODIGO, NOME, TELEFONE, EMAIL, SALDO_CREDITOS from USUARIOS")
    for (let row of query.rows) {
        resultado.push({
            codigo: row.codigo,
            nome: row.nome,
            telefone: row.telefone,
            email: row.email,
            saldoCredito: row.saldo_creditos
        });

    };
    await client.end();

    res.send(JSON.stringify({ resultado }));
});

router.post('/', async (req,res) => {
    const client = criaClient();
    await client.connect();
    let payload = req.body;
    let sql = `insert into USUARIOS (CODIGO, NOME, TELEFONE, EMAIL, SALDO_CREDITOS) VALUES
    (nextval('usuarios_sequence'),'${payload.nome}','${payload.telefone}','${payload.email}', ${payload.saldoCreditos})
    `;
    await client.query(sql);
    res.send('Dados inseridos')
    await client.end()

    res.status(201);
    res.send();
});

router.put('/:codigo', async (req, res) =>{
let codigo = req.params.codigo;
let payload = req.body;
const client = criaClient();
await client.connect();

let sql = `update USUARIOS set
NOME = '${payload.nome}',
TELEFONE = '${payload.telefone}',
EMAIL = '${payload.email}',
SALDO_CREDITOS = ${payload.saldoCreditos}
where
codigo = ${codigo}
`;

await client.query(sql);
res.send('Usuario foi alterado')
await client.end()

res.status(204);
})

router.delete('/:codigo', async (req, res) =>{
    let codigo = req.params.codigo;
let payload = req.body;
const client = criaClient();
await client.connect();

let sql = `delete from USUARIOS
where
codigo = ${codigo}
`;

await client.query(sql);
res.send('Usuario foi deletado')
await client.end()

res.status(204);

})




function criaClient() {
    return new Client({
        user: 'dia3',
        host: 'localhost',
        database: 'db_dia3',
        password: '1234',
        port: 5432
   })
}

export default router;