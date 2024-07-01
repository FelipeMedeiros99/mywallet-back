import chalk from "chalk"
import bcrypt from "bcrypt"

import { novoUsuarioSchema } from "../schemas.js"
import db from "../banco.js"
import filtroErroSchemas from "../utils/filtroErroSchemas.js";


/**
 * armazena os dados do usuário no banco de dados
 */
export async function novoUsuarioPostController(req, res){
    const {body:dados} = req;
    try{
        // validando se os dados foram preenchidos corretamente
        await novoUsuarioSchema.validateAsync(dados, {abortEarly: false});
        // criptografando senha
        const senha = await bcrypt.hash(dados.Senha, 10);
        // Removendo redundancia
        delete dados.Confirmar;
        
        
        // Salvando usuário no banco
        await db.collection("mywallet-usuarios").insertOne({...dados,"E-mail": dados["E-mail"].toLowerCase(), "Senha": senha, Saldo: 0, Entradas: [], Saidas: []});
        // Retornando para o usuário
        console.log("usuario cadastrado com sucesso");
        return res.sendStatus(200);

    }catch(e){
        // tratamento de erros
        console.log(chalk.red("Erro ao Salvar novo usuário: ", e));
        const mensagensErro = filtroErroSchemas(e);
        return res.status(406).send(`Erro ao salvar usuário: ${mensagensErro || "erro desconhecido"}`);
    }
}

