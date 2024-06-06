// Importando o Express
import express from "express" 
// Iniciando o Express
const app = express() 
// Importando a ODM Mongoose
import mongoose from "mongoose"
// importando o express-session
import session from "express-session"

import Auth from "./middleware/Auth.js"


// condigurando o express session

app.use(session({
    secret: "lojasecret",
    // sessao expira em n segundos (360000 = 1hr/ 30000 = 30 segundos)
    cookie: {maxAge: 3600000},
    saveUninitialized: false,
    resave: false

}))


// Importando os Controllers (onde estão as rotas)
import ClientesController from "./controllers/ClientesController.js"
import PedidosController from "./controllers/PedidosController.js"
import ProdutosController from "./controllers/ProdutosController.js"
import UsersController from "./controllers/UsersController.js"

app.use(express.urlencoded({extended:false}))
app.use(express.json())


// Iniciando conexão com o banco de dados do MongoDB
mongoose.connect("mongodb://localhost:27017/loja")

// Define o EJS como Renderizador de páginas
app.set('view engine', 'ejs')
// Define o uso da pasta "public" para uso de arquivos estáticos
app.use(express.static('public'))
// Definindo o uso das rotas dos Controllers
app.use("/", ClientesController)
app.use("/", PedidosController)
app.use("/", ProdutosController)
app.use("/", UsersController)

// ROTA PRINCIPAL
app.get("/",Auth,function(req,res){
    res.render("index")
})

// INICIA O SERVIDOR NA PORTA 8080
app.listen(8080,function(erro){
    if(erro) {
        console.log("Ocorreu um erro!")

    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})