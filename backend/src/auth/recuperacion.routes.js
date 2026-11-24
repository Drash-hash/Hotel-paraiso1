const router = require('express').Router();
 
const {
  solicitarRecuperacion,
  restablecerPassword
} = require('./recuperacion.controller');


const recuperacionLimiter = require('../middlewares/recuperacionLimiter')


router.post('/solicitar', recuperacionLimiter, solicitarRecuperacion);
router.post('/restablecer', restablecerPassword);
 
module.exports = router;