import axios from 'axios';
import { writeFile, readFile } from 'node:fs/promises';

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'

        }
    }

    async ciudad(lugar = "") {


        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const res = await instance.get();
            return res.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch (error) {
            console.log(error);
        }


        return [];
    }

    async clima(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            })
            const res = await instance.get();
            const { weather, main } = res.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = '') {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();
    }

    async guardarDB() {
        try {

            const payload = {
                historial: this.historial,
            }
            const controller = new AbortController();
            const { signal } = controller;
            const data = new Uint8Array(Buffer.from(JSON.stringify(payload)));

            // Si data, no tiene nada, aborta
            // let data = "";
            if (!data) controller.abort();
            const promise = writeFile(this.dbPath, data, { signal });
            await promise;

        } catch (err) {
            console.log(err.message);
        }
    }

    async leer() {
        try {
            const filePath = new URL('../db/database.json', import.meta.url);
            const content = await readFile(filePath, { encoding: 'utf-8' });
            const data = JSON.parse(content);
            return data.historial;
        } catch (err) {
            console.log(err.message);
        }
    };
}


export { Busquedas };