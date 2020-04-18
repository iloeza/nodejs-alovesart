const express = require('express');
const router = express.Router();
const pool = require('../database');
const path = require('path');
const multer = require('multer');


router.get('/admin/add', (req, res) => {
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

router.post('/admin/added', upload, async (req, res) => {
    const { idMarca, Descripcion, Stock, Modelo } = req.body;
    var Imagen = req.file.originalname;
    const new_case = {
        idMarca,
        Descripcion,
        Stock,
        Imagen,
        Modelo
    }
    await pool.query('INSERT INTO productos SET ?', [new_case]);
    res.render('fundas/added');
})


router.get('/admin/catalog', async (req, res) => {
    await pool.query('SELECT * FROM productos', (err, productos) => {
        if (err) throw err;
        res.render('fundas/catalog', {
            data: productos
        });
    });
})

router.get('/admin/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM productos WHERE idProducto = ?', [id]);
    res.render('fundas/deleted');
})

router.get('/admin/edit/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('SELECT * FROM productos WHERE idProducto = ?', [id], (err, productos) => {
        if (err) throw err;
        console.log(productos)
        res.render('fundas/edit', {
            data: productos
        });
    });
})

router.post('/admin/edited/:id', async (req, res) => {
    const { id } = req.params;
    const { idMarca, Descripcion, Stock, Modelo } = req.body;
    //var Imagen = req.file.originalname;
    const edit_case = {
        idMarca,
        Descripcion,
        Stock,
        Modelo
    }
    await pool.query('UPDATE productos SET ? WHERE idProducto = ?', [edit_case, id]);
    res.render('fundas/edited');
})
module.exports = router;