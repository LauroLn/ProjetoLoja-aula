import express from "express"
const router = express.Router()
import ClienteService from "../services/ClienteService.js"
import cliente from "../models/Cliente.js"
import Auth from "../middleware/Auth.js"

// ROTA CLIENTES
router.get("/clientes", Auth, function(req, res){
    ClienteService.SelectAll().then((clientes) =>{
        res.render("clientes", {
            clientes : clientes
        })
    })
})
// ROTA DE CADASTRO DE CLIENTES

router.post("/clientes/new", Auth, (req, res) =>{
    ClienteService.Cadastrar(
        req.body.nome,
        req.body.cpf,
        req.body.endereco
    )
    res.redirect("/clientes")
})

//ROTA DE EXCLUSAO DE CLIENTES
router.get("/clientes/delete/:id", Auth,(req,res) =>{
    const id = req.params.id
    ClienteService.Delete(id)
    res.redirect("/clientes")
})

// rota de edição de clientes
router.get("/clientes/edit/:id",Auth,(req,res)=>{
    const id = req.params.id 
    ClienteService.SelectOne(id).then((cliente)=> {
        res.render("clienteEdit", {
            cliente : cliente
        })
    })
 
})

// ROTA DE ALTERAÇAO

router.post("/clientes/update/:id",Auth, (req,res)=>{
    ClienteService.Update(
        req.body.id,
        req.body.nome,
        req.body.cpf,
        req.body.endereco
    )
    res.redirect("/clientes")
        
    
})

export default router //exportando o módulo "router"