import bcrypt from "bcrypt"

import db from "../banco.js";
import { usuarioSchema } from "../schemas.js";

/**
 * 
 * @param {*} req  - requisição recebida 
 * @param {*} res  - reposta para o usuario 
 * @param {*} next - se existir, manda para o próximo middleware
 */
export async function usuarioExiste(req, res, next){
    const {body: dados} = req

    
    try{
        // validando se os dados foram enviados corretamente
        await usuarioSchema.validateAsync(dados)
        // buscando dados no banco
        const dadosUsuarioBanco = await db.collection("usuarios").findOne({"E-mail": dados["E-mail"]})
        
        // retornando erro caso usuário não exista
        if(dadosUsuarioBanco === null){
            return res.status(401).send("Usuário não encontrado")
        }         
        next()    

    }catch(e){
        console.log("erro ao localizar usuário: ", e)
        const erro = e.details?.map(e=>e.message)
        console.log(e)
        return res.status(401).send(`Erro ao realizar login: ${e}`)
    }

}