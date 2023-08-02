import inquirer from 'inquirer';
import ansi from './colors-ansi.js';


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${ansi.success.bold("1.")}${ansi.primary.bold("Buscar ciudad.")}`
            },
            {
                value: 2,
                name: `${ansi.success.bold("2.")}${ansi.primary.bold("Historial.")}`
            },
            {
                value: 0,
                name: `${ansi.success.bold("0.")}${ansi.primary.bold("Salir.")}`
            },
        ]
    }
];

const inquirerMenu = async () => {
    // console.clear();
    console.log(ansi.success.bold("======================="));
    console.log(ansi.success.bold(" Seleccione una Opcion:"));
    console.log(ansi.success.bold("=======================\n"));

    const opcion = inquirer.prompt(preguntas);

    return opcion;
};

const pausar = async () => {
    const enter = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ansi.success.bold("ENTER")} para continuar`,
        }
    ];

    await inquirer.prompt(enter);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor.';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, index) => {
        const idx = `${ansi.success.bold(`${index + 1}`)}.`;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: `${ansi.success.bold(`0. Cancelar`)}`
    })

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar: ',
        choices
    }]
    const { id } = await inquirer.prompt(preguntas);


    return id;
};

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const idx = `${ansi.success.bold(`${index + 1}`)}.`;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]
    const { ids } = await inquirer.prompt(pregunta);


    return ids;
};

const confirmar = async (message) => {
    const questions = [{
        type: 'confirm',
        name: 'ok',
        message
    }]

    const { ok } = await inquirer.prompt(questions);
    return ok;
};

export { inquirerMenu, pausar, leerInput, listarLugares, confirmar, mostrarListadoCheckList };
