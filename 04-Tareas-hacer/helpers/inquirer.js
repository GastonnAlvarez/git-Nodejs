import inquirer from 'inquirer';
import ansi from './colors-ansi.js';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ansi.success.bold("1.")}${ansi.primary.bold("Crear Tarea")}`
            },
            {
                value: '2',
                name: `${ansi.success.bold("2.")}${ansi.primary.bold("Listar Tarea")}`
            },
            {
                value: '3',
                name: `${ansi.success.bold("3.")}${ansi.primary.bold("Listar Tareas Completadas")}`
            },
            {
                value: '4',
                name: `${ansi.success.bold("4.")}${ansi.primary.bold("Listar Tareas Pendientes")}`
            },
            {
                value: '5',
                name: `${ansi.success.bold("5.")}${ansi.primary.bold("Tareas Comletadas")}`
            },
            {
                value: '6',
                name: `${ansi.success.bold("6.")}${ansi.primary.bold("Borrar Tareas")}`
            },
            {
                value: '0',
                name: `${ansi.success.bold("0.")}${ansi.primary.bold("Salir")}`
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

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const idx = `${ansi.success.bold(`${index + 1}`)}.`;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: `${ansi.success.bold(`0. Cancelar`)}`
    })

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
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

export { inquirerMenu, pausar, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList };
