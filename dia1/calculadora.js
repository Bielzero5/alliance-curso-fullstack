<<<<<<< HEAD
import { Router } from 'express';
import path from 'path';
=======
import { Router } from 'express'
import path from 'path'
>>>>>>> 85526e5c703732a8c115ac4a5546642d938d78b4

const router = Router();

router.get('/', (req, res) => {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname, 'index.html'));
=======
    res.sendFile(path.join(__dirname,'index.html'));
>>>>>>> 85526e5c703732a8c115ac4a5546642d938d78b4
});

router.post('/', (req, res) => {
    let operando1 = req.body.operando1;
    let operando2 = req.body.operando2;
    let operador = req.body.operador;

    let resultado;
    if (operador == '+') resultado = Number(operando1) + Number(operando2);
    else if (operador == '-') resultado = operando1 - operando2;
    else if (operador == '*') resultado = operando1 * operando2;
    else if (operador == '/') resultado = operando1 / operando2;

<<<<<<< HEAD
    res.status = 200;

    res.send(JSON.stringify({resultado}));
})
=======
    res.status = 200
    res.send(JSON.stringify({ resultado }));
});
>>>>>>> 85526e5c703732a8c115ac4a5546642d938d78b4

export default router;