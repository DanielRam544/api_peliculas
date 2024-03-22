const express = require('express');
const peliculasController = require('./controllers/PeliculasController');
const authenticateJWT = require('./authMiddleware');
const usersController = require('./controllers/UserController')


const router = express.Router();

router.post('/peliculas', async (req, res) => {
    peliculasController.create(req, res);
});

// Ruta para listar todas las peliculas
router.get('/peliculas', async (req, res) => {
    peliculasController.list(req, res);
});

// Ruta para obtener una pelicula por su id
router.get('/peliculas/:id', async (req, res) => {
    peliculasController.get(req, res);
});

// Ruta para actualizar una pelicula por su id
router.put('/peliculas/:id', async (req, res) => {
    peliculasController.update(req, res);
});

// Ruta para eliminar una pelicula por su id
router.delete('/peliculas/:id', async (req, res) => {
    peliculasController.delete(req, res);
});

//Ruta para ir a la pagina de inicio
router.get('/', (req, res) => {
    res.render('index');
});



//Ruta para solicitar token de autentificacion
router.post('/get-token', async(req,res)=>{
    if(Object.keys(req.query).length > 0){
        var request = req.query;
    }else if(Object.keys(req.body).length > 0){
        var request = req.body;
    }
    console.log(request);
    const {email,api_key} = request;
    try {
        const result = await usersController.authenticate(email, api_key);
        res.json(result)
    }catch (error){
        res.status(401).json({error:error.message})
    }
})

//Ruta para token
router.get('/login',async (req, res)=>{
    usersController.token_login(req, res);
})

//Ruta para login
router.post('/login',async (req, res)=>{
    usersController.login(req, res);
})

//Ruta para logout xD
router.post('/logout', async (req, res)=>{
    usersController.logout(req,res);
});

//Ruta para usuarios
router.post('/users',async (req,res)=>{
    usersController.create(req,res);
})


module.exports = router;