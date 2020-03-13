const express = require('express');
const router = express.Router();
const pool = require('../database');
const path = require('path');
const multer = require('multer');

router.get('/add', (req, res) => {
    res.render('fundas/add')
})

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000
    }
}).single('Imagen');

router.post('/added', upload, async (req, res) => {
    const { idMarca, Color, Descripcion, Stock } = req.body;
    var Imagen = req.file.originalname;
    const new_case = {
        idMarca,
        Color,
        Descripcion,
        Stock,
        Imagen
    }
    console.log(new_case);
    await pool.query('INSERT INTO productos SET ?', [new_case]);
    res.render('fundas/added');
})


router.get('/', async (req, res) => {
    await pool.query('SELECT * FROM productos', (err, productos) => {
        if (err) throw err;
        res.render('fundas/catalog', {
            data: productos
        });
    });
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await pool.query('DELETE FROM productos WHERE idProducto = ?', [id]);
    res.render('fundas/deleted');
})
module.exports = router;