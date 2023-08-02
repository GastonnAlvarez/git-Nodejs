import colors from "../helpers/colors-ansi.js";
import { Tarea } from "./tarea.js";

export class Tareas {
    _listado = {};

    get listarTarea() {
        let listado = [];
        Object.keys(this._listado).forEach(key => {
            let tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasArray(listadoArr = []) {

        listadoArr.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto() {

        console.log();
        this.listarTarea.forEach((tarea, i) => {
            const idx = `${i + 1}`;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completado'
                : 'Pendiente';

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listarTarea.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? `${colors.success.bold(`Completado`)}`
                : `${colors.danger.bold(`Pendiente`)}`

            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador + '.'} ${desc} :: ${completadoEn}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.')} ${desc} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listarTarea.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}