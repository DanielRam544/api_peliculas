const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {SwaggerTheme} = require('swagger-themes');

require('./db');
const routes = require('./routes');
const app = express();
const port = 3000;

//Motor de plantillas ejs
app.use(bodyParser.urlencoded({extended:true}));
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));//ajustar las rutas segun la estructura de neustra carpeta

//parseamos la solicitud y  limitamos el tamaño de las solicitudes
app.use(bodyParser.json({limit:'50kb'}));

// RUTAS PARA EL CRUD
app.use(routes);

//configuramos nuestro tema de swagger
const theme = new SwaggerTheme();

//Configuración de swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Servicio REST de Peliculas',
            description: 'API REST para administrar peliculas',
            version: '1.0.0',
            contact:{
                name:'Daniel Ramirez',
                email:'danidehorta544@gmail.com',
                url:'https://ejemplo.com/support,'
            },
            termsOfService:"http://ejemplo.com/terms",
        },
    },
    apis: ['doc.js'],
}

const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
}
//INICIAMOS LA DOCUMENTACION DE NUESTRO SERVICIO
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/peliculas-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,options));


//module.exports = app; 
//exportamos la aplicación para poder ser utilizada en otros archivos


//INICIAR EL SERVIDOR
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto:' + port);
});
