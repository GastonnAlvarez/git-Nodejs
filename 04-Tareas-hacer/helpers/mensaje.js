require('colors');

const mostrarMensaje = () => {

    return new Promise((resolve) => {
        console.log("=======================".green);
        console.log(" Seleccione una Opcion:".green);
        console.log("=======================\n".green);

        console.log(`${'1.'.green} ${'Crear Tarea'.blue}`);
        console.log(`${'2.'.green} ${'Listar Tareas'.blue}`);
        console.log(`${'3.'.green} ${'Listar Tareas Completadas'.blue}`);
        console.log(`${'4.'.green} ${'Listar Tareas Pendientes'.blue}`);
        console.log(`${'5.'.green} ${'Completar Tareas'.blue}`);
        console.log(`${'6.'.green} ${'Borrar Tarea'.blue}\n`);
        console.log(`${'0.'.green} ${'Salir'.blue}`);

        const rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question('Seleccione una opcion: ', (request) => {
            console.log(request);
            rl.close();
            resolve(request);
        });
    });

};

const pausa = () => {
    return new Promise((resolve) => {
        const rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question(`\nPresione ${'ENTER'.green} para continuar\n`, (request) => {
            rl.close();
            resolve();
        });
    });
};

module.exports = {
    mostrarMensaje,
    pausa
}