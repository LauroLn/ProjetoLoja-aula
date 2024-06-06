import express from "express"
import bcrypt from "bcrypt"
const router = express.Router()
import UserService from "../services/UserService.js"


// ROTA DE LOGIN

router.get("/login", (req,res) =>{
    res.render("login", {
        loggedOut: true
    })
    
})

// rota de autenticação
router.post("/authenticate", (req, res) =>{
    const email = req.body.email
    const password = req.body.password
    //busca o usuario no banco
    UserService.SelectOne(email).then(user =>{
        //Se o usuario existir
        if(user != undefined){
            //valida senha
            const correct = bcrypt.compareSync(password, user.password)
            //se a senha for valida
            if(correct){
                //autoriza o login
                req.session.user ={
                    id : user._id,
                    email : user.email
                }
                //reposta enviada apos o login
            // res.send(`Usuario logado <br> id: ${req.session.user['id']} <br> Email: ${req.session.user['email']}`)
            res.redirect("/")
            }else{
                res.send(`Senha Invalida! <br> <a href="/login"> Tentar novamente.</a> `)
            }
        }else{
            res.send(`Usuario não existe. 
            <br><a href="/login">Tentar Novamente</a>`)
        }
    })
})
//rota de desconect
router.get("/logout", (req,res) =>{
    req.session.user = undefined
    res.redirect("/")
})


//ROTA DE CADASTRO

router.get("/cadastro", (req,res) =>{
    res.render("cadastro", {
        loggedOut: true
    })
    
})

//ROTA DE CRIAÇÃO DE USUARIO NO BANCO

router.post("/createUser", (req,res) =>{
    //coletando informações do corpo da requisição

    const email = req.body.email
    const password = req.body.password

    // verificar se o usuario ja esta cadastrado no banco
    UserService.SelectOne(email).then(user =>{
        //se o usuario nao existir
        if (user == undefined){
            //Aqui será feito o cadastro
            const salt = bcrypt.genSaltSync(15)
            const hash = bcrypt.hashSync(password, salt)
            UserService.Create(email, hash)
            res.redirect("/login")
        }else{
            res.send(`usuario ja cadastrado <a href="/cadastro">Tentar novamente</a>`)
            
        }
    })

  
    

})

export default router