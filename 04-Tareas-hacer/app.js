import { escribir, leer } from './helpers/guardarData.js';
import {
    inquirerMenu,
    pausar,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';



const main = async () => {

    let opt = "0";
    const tareas = new Tareas();
    leer().then(tarea => {
        tareas.cargarTareasArray(tarea);
    });

    do {
        let value = await inquirerMenu();

        opt = value.opcion;

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listarTarea);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listarTarea)
                if (id !== "0") {
                    const sino = await confirmar("Desea eliminarlo?")
                        .then(conf => {
                            if (conf) {
                                tareas.borrarTarea(id);
                            }
                        })
                }
                break;
        }

        escribir(tareas.listarTarea);



        await pausar();

    } while (opt !== "0");
};

main();