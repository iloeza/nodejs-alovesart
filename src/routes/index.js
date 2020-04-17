const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
    res.render('indexAdmin');
})

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;