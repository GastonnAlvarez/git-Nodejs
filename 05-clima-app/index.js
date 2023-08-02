// Mi archivo '.env' ahora se encuentra en los procesos, como variable de entorno
import 'dotenv/config'

import { inquirerMenu, leerInput, listarLugares, pausar } from "./helpers/inquirer.js";
import ansi from './helpers/colors-ansi.js';
import { Busquedas } from "./models/busquedas.js";


const busquedas = new Busquedas();

const main = async () => {
    let opt = 0;

    do {
        let value = await inquirerMenu();
        opt = value.opcion;

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');

                // Buscar lugar
                const places = await busquedas.ciudad(lugar);

                // Obtengo el id
                const id = await listarLugares(places);
                if (id === "0") continue;


                // Encuentro un unico lugar por medio del id
                const lugarSel = places.find(l => l.id === id);
                // Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                // Obtengo el clima
                const cli = await busquedas.clima(lugarSel.lat, lugarSel.lng);

                console.log(ansi.success.bold('\n Informacion de la ciudad \n'));
                console.log('Ciudad: ', lugarSel.nombre)
                console.log('Lat: ', lugarSel.lat)
                console.log('Lng: ', lugarSel.lng)
                console.log('Temperatura: ', cli.temp)
                console.log('Minima: ', cli.min)
                console.log('Maxima: ', cli.max)
                console.log('Como se vera el clima: ', cli.desc)
                break;

            case 2:
                await busquedas.leer()
                    .then(lugar => {
                        lugar.forEach((l) => {
                            console.log(`${l}`);
                        })
                    })
                break;
        }

        if (opt !== 0) await pausar();

    } while (opt !== 0);
};

main();