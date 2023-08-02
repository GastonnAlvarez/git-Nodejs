import { writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

let listado = {};

let db = {
    "6ed68323-4404-42b3-9069-bb172ddddba6": {
        "id": "6ed68323-4404-42b3-9069-bb172ddddba6", "desc": "Tarea 1", "completadoEn": "2023-08-02T12:19:48.813Z"
    },
    "70a3b298-1399-4016-8ae5-4ca06dbc60aa": {
        "id": "70a3b298-1399-4016-8ae5-4ca06dbc60aa", "desc": "Tarea 2", "completadoEn": null
    },
    "68cfcce1-cccf-483c-8df7-a5bebc7fc8c7": {
        "id": "68cfcce1-cccf-483c-8df7-a5bebc7fc8c7", "desc": "Tarea 3", "completadoEn": "2023-08-02T12:19:48.814Z"
    },
    "9c4395b9-87c8-40cd-ba36-682e21b91b33": {
        "id": "9c4395b9-87c8-40cd-ba36-682e21b91b33", "desc": "Tarea 4", "completadoEn": null
    },
    "b2afa03a-17b5-441c-8fe5-d60e0032cf64": {
        "id": "b2afa03a-17b5-441c-8fe5-d60e0032cf64", "desc": "Tarea 5", "completadoEn": "2023-08-02T12:19:54.301Z"
    }
}

const listadoTareas = () => {
    let listado = [];
    Object.keys(db).forEach(key => {
        let t = db[key]
        listado.push(t);
    });

    return listado;
}

export const escribir = async (message) => {
    try {
        const controller = new AbortController();
        const { signal } = controller;
        const data = new Uint8Array(Buffer.from(JSON.stringify(message)));

        // Si data, no tiene nada, aborta
        // let data = "";
        if (!data) controller.abort();
        const promise = writeFile('./datos.json', data, { signal });
        await promise;

    } catch (err) {
        console.log(err.message);
    }
};

escribir(listadoTareas());

console.log(listadoTareas()[0]);
