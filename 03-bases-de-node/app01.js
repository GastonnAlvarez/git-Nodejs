const { crearArchivo } = require('./helpers/multiplicar.js');
const argv = require('../config/yargs.js');

console.log(argv);

crearArchivo(argv.b, argv.l, argv.h)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
