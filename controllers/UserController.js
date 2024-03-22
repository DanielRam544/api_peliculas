var Users = require('../models/Users');
const jwt = require('jsonwebtoken');

const blacklistedtokens = new Set();

//Definimos el crud de operaciones
exports.create = async function(req, res){
    if(Object.keys(req.query).length > 0) {
        var request = req.query
    } else if (Object.keys(req.body).length > 0) {
        var request = req.body;
    }

    //Validar campos obligatorios
    if(!request.email || !request.password){
        return res.status(404).json({message:'Error en los campos'});
    }try {
        const existeUsuario = await Users.findOne({email: request.email});
        if(existeUsuario){
            return res.status(404).json({message:'Ya lo registraste wey'});
        }

        const user = new Users(request);
        await user.save();

        return res.json({user, message:'Usuario guardado correctamente'});
    } catch(error){
        return res.status(500).json({message:'Error al guardar el usuario', error:error.message});
    }

}

exports.authenticate = async function(email, api_key){
    try{
        //Buscar el usuario por email y apikey
        const user = await Users.findOne({email,api_key});
        if(!user){
            return res.status(400).json({message:'No se encuentra'});
        }

        if(user.saldo <= 0){
            return res.status(400).json({message:'Se agoto el saldo del usuario'});
        }

        //si el usuario es valido y tiene mas de 0 le generamos un token
        const token =  jwt.sign({email,api_key},'tu-secreta',{expiresIn: '1h'});
        return{token, message:'token generado correctamente por 1hr'};

    }catch (error) {
        return res.status(501).json({message:'Error en la autentificacion'+error.message});
    }
}

exports.token_login = async function(req, res){
    try{
        const secretKey = 'tu-secreta';
        const tokenContent = {desctiption: 'token_para_logs'};
        
        const token = jwt.sign(tokenContent, secretKey,{expiresIn: '2hr'});
        console.log(token)
        res.render('login',{csrfToken:token, message:null}) 

    }catch (error){
        res.render('login',{message:'error'})
    }
}

exports.login = async function(req, res){
    try {
        const token = req.body._csrf;
        if(blacklistedtokens.has(token)){
            res.render('login',{csrfToken,message:'El token ha expirado'})
        }
        if (!token){
            const secretKey = 'tu-secreta';
            const tokenContent = {desctiption: 'token_para_logs'};
        
            const newToken = jwt.sign(tokenContent, secretKey,{expiresIn: '2hr'});
            res.render('login', {csrfToken:newToken, message:'El token es requerido'})
            return;
        }
        const decodedToken = jwt.verify(token,'tu-secreta');
        if (decodedToken){
            const user = await Users.findOne({email:req.body.email,password:req.body.password})
            if(!user){
                res.render('login', {csrfToken:null, message:'El usuario o el password es incorrecto'})
            }else {
                res.render('index',{email:user.email, api_key:user.api_key, saldo:user.saldo, token:token,message:null})
            }
        }else{
            const secretKey = 'tu-secreta';
            const tokenContent = {desctiption: 'token_para_logs'};
            const newToken = jwt.sign(tokenContent, secretKey,{expiresIn: '2hr'});
            res.render('login', {csrfToken:newToken, message:'El token es requerido'})
        }

    }catch (error) {
        res.render('login', {csrfToken:null, message:'El token es requerido'})

    }
}

exports.logout = async function(req, res){
    try {
        const token = req.body._token;
        blacklistedtokens.add(token);
        const secretKey= 'tu-secreta';
        const tokenContent = {desctiption: 'token_para_login'};
        const csrfToken = jwt.sign(tokenContent, secretKey, {expiresIn: '1h'});

        res.render('login',{csrfToken:csrfToken,message: 'Sesion cerrada correctamente'});
    }catch (error) {
        res.render('login',{csrfToken:null, message:error.message});
    }
}