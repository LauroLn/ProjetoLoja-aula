import mongoose from "mongoose"
import cliente from "../models/Cliente.js"

const Cliente = mongoose.model("Cliente", cliente)

class ClienteService {
    // Método para SELECIONAR TODOS os Clientes no banco
    SelectAll() {
        const clientes = Cliente.find()
        return clientes
    }
    //metodo para CADASTRAR CLIENTE

    Cadastrar(nome, cpf, endereco){
         const novoCliente = new Cliente({
            nome : nome,
            cpf : cpf,
            endereco: endereco
         })
         novoCliente.save()
    }

   Delete(id){
    Cliente.findByIdAndDelete(id).then(()=>{
        console.log(`Cliente com a id: ${id} foi deletado.`)
    }).catch(err =>{
        console.log(err)
    })
   }

   //metodo para selecionar um cliente unico
   SelectOne(id){
    const cliente = Cliente.findOne({_id : id})
    return cliente
   }
   // metodo para alterar o cliente
   Update(id, nome, cpf, endereco){
    Cliente.findByIdAndUpdate(id, {
        nome : nome,
        cpf : cpf,
        endreco : endereco
    }).then(()=>{
        console.log(`Dados do cliente ${id} alterados com suceso`)
    }).catch(err =>{
        console.log(err)
    })
   }

}

export default new ClienteService()