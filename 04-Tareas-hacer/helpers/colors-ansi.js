import ansi from '../node_modules/ansi-colors-es6/index.js';

const colors = ansi.theme({
    danger: ansi.red,
    dark: ansi.dim.gray,
    disabled: ansi.gray,
    em: ansi.italic,
    heading: ansi.bold.underline,
    info: ansi.cyan,
    muted: ansi.dim,
    primary: ansi.blue,
    strong: ansi.bold,
    success: ansi.green,
    underline: ansi.underline,
    warning: ansi.yellow
});

export default colors;