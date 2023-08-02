import { writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

const path = './db/data.json';

export const escribir = async (message) => {
    try {
        const controller = new AbortController();
        const { signal } = controller;
        const data = new Uint8Array(Buffer.from(JSON.stringify(message)));

        // Si data, no tiene nada, aborta
        // let data = "";
        if (!data) controller.abort();
        const promise = writeFile(path, data, { signal });
        await promise;

    } catch (err) {
        console.log(err.message);
    }
};

export const leer = async () => {
    try {
        const filePath = new URL('../db/data.json', import.meta.url);
        const content = await readFile(filePath, { encoding: 'utf-8' });
        const data = JSON.parse(content);
        return data;
    } catch (err) {
        console.log(err.message);
    }
};