const fs = require('fs');
const crearArchivo = async (num = 5, listar = false, hasta) => {

    try {
        let salida = "";
        for (let x = 1; x <= hasta; x++) {
            salida += `${num}x${x}=${num * x}\n`;
        }
        if (listar) {
            console.log(salida);
        }

        fs.writeFileSync(`./salida/Tabla-${num}.txt`, salida);

        return `La tabla del ${num} fue Creada`;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    crearArchivo
}