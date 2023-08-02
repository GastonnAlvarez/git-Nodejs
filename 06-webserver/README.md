# Web Server

## Despliego con Express una multi-page web

## Skills utilizadas y lo que aprendi:

+ Paquete  npm I express
+ res.whiteHead(), manipulo la informacion que resonso al cliente
+ res.white(), escribo lo que quiero que vea el cliente
+ res.setHeader(), aprendi el 'Content-Disposition' para que al visitar la pagina, automaticamente se descargue un archivo el cliente.
+ Middlewares, utilizo 'app.use(express...)' para devolver contenido estatico en la carpeta 'public'
+ res.sendFile(__dirname + ... ), envio por medio de la ruta el archivo que quiero que el cliente visualize
+ app.get(*), mostrando una pagina de Error de ruta.
+ Handlebars, primero instale npm install hbs, para poder utilizar una carpeta 'view' y renderizar el contenido dentro con 'res.render('home')'
+ Partials, creo una carpeta con pequeños codigos HTML que son repetitivos en mis paginas y luego las renderizo por medio de: {{> nav }}