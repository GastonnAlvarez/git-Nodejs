const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Esta bandera recibe un numero que hara su tabla de multiplicar'
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: true,
        default: false,
        describe: 'Esta bandera es para que muestre por consola la tabla o no, al usarla el valor se vuelve true y por eso lo muestra'
    })
    .option('h', {
        alias: 'hasta',
        type: 'number',
        demandOption: 'true',
        describe: 'Esta bandera me dice hasta que numero quiere su tabla de multiplicar'
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La base no es un numero';
        }

        return true;
    })
    .argv;

module.exports = argv;