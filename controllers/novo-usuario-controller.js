import chalk from "chalk"
import bcrypt from "bcrypt"

import { novoUsuarioSchema } from "../schemas.js"
import db from "../banco.js"


// TODO: adicionar validação para ver se o usuário ou email já existe
// TODO: CRIPTOGRAFAR SENHA AO SALVAR NO SERVIDOR
export async function novoUsuarioPost(req, res){
    const {body:dados} = req
    try{
        const validacao = await novoUsuarioSchema.validateAsync(dados, {abortEarly: false})
        
        let senha = await bcrypt.hash(dados.Senha, 10)
        
        db.collection("usuarios").insertOne({...dados, "Senha": senha})
        console.log("usuario cadastrado com sucesso")
        return res.sendStatus(200)

    }catch(e){
        console.log(chalk.red("Erro ao Salvar novo usuário: ", e));
        const mensagensErro = e.details.map(objErro => objErro.message)
        return res.status(406).send(`Erro ao salvar usuário: ${mensagensErro}`);
    }
}

