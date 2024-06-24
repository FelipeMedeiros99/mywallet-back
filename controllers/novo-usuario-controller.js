import chalk from "chalk"

import { novoUsuarioSchema } from "../schemas.js"

export async function novoUsuarioPost(req, res){
    const {body:dados} = req
    try{
        const validacao = await novoUsuarioSchema.validateAsync(dados, {abortEarly: false})
        return res.sendStatus(200)

    }catch(e){
        console.log(chalk.red("Erro ao Salvar novo usuário: ", e));
        const mensagensErro = e.details.map(objErro => objErro.message)
        return res.status(406).send(`Erro ao salvar usuário: ${mensagensErro}`);
    }
}

