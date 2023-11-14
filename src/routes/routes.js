const { Router } = require("express");

const router = Router();
router.get('/producto', require('../controllers/read'))


module.exports = router