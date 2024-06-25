import chalk from "chalk"
import bcrypt from "bcrypt"

import { novoUsuarioSchema } from "../schemas.js"
import db from "../banco.js"


/**
 * armazena os dados do usuário no banco de dados
 */
export async function novoUsuarioPostController(req, res){
    const {body:dados} = req
    try{
        await novoUsuarioSchema.validateAsync(dados, {abortEarly: false});
        const senha = await bcrypt.hash(dados.Senha, 10);
        delete dados.Confirmar 
        await db.collection("mywallet-usuarios").insertOne({...dados, "Senha": senha});
        console.log("usuario cadastrado com sucesso");
        return res.sendStatus(200);

    }catch(e){
        console.log(chalk.red("Erro ao Salvar novo usuário: ", e));
        const mensagensErro = e.details?.map(objErro => objErro.message)
        return res.status(406).send(`Erro ao salvar usuário: ${mensagensErro || "erro desconhecido"}`);
    }
}

