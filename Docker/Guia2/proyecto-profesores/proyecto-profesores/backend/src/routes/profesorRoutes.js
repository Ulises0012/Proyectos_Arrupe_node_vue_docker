// backend/src/routes/profesorRoutes.js
const express = require('express');
const profesorController = require('../controllers/profesorController');

const router = express.Router();

router.get('/', profesorController.getProfesores);
router.post('/', profesorController.addProfesor);
module.exports = router;