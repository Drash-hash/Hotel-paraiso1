const rateLimit = require("express-rate-limit");


const recuperacionLimiter = rateLimit({
  WindowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    mensaje: "Demasiadas solicitudes, intente mas tarde",
  },
});


module.exports = recuperacionLimiter;