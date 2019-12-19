import { Router } from 'express'
import { Client } from 'pg'

const router = Router(); 

router.get('/', async (req,res) => {
    let resultado = [];
    const client = criaBicicletas();

    await client.connect();
    let query = await client.query("select CODIGO, ATIVO from BICICLETAS")
    for (let row of query.rows) {
        resultado.push({
            codigo: row.codigo.trim(),
            ativo: row.ativo.trim()
        });

    };
    await client.end();

    res.send(JSON.stringify( resultado ));
});

router.post('/', async (req,res) => {
    const client = criaBicicletas();
    await client.connect();
    let payload = req.body;
    let sql = `insert into BICICLETAS (CODIGO, ATIVO) VALUES
    ('${payload.codigo}', '${payload.ativo}')
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
const client = criaBicicletas();
await client.connect();

let sql = `update BICICLETAS set
ATIVO = '${payload.ativo}'
where
codigo = '${codigo}'
`;


await client.query(sql);
res.send('Usuario foi alterado')
await client.end()

res.status(204);
})

router.delete('/:codigo', async (req, res) =>{
    let codigo = req.params.codigo;
    let payload = req.body;
    const client = criaBicicletas();
    await client.connect();

    let sql = `delete from BICICLETAS
where
    codigo = '${codigo}'
    `;

console.log(sql)

await client.query(sql);
res.send('Bicicleta foi deletado')
await client.end()


res.status(204);

})




function criaBicicletas() {
    return new Client({
        user: 'dia3',
        host: 'localhost',
        database: 'db_dia3',
        password: '1234',
        port: 5432
   })
}

export default router;