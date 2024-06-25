import { v4 as uuid } from "uuid"
import db from "../banco.js";

/**
 * cadastra token temporário para o usuário durante o login 
 */
export default async function criacaoDeToken(req, res){
    const { body: dados } = req;
    delete req.dadosUsuarioBanco.Senha

    const entrada = Date.now()
    const token = uuid()
    const dadosDeAutenticacao = {"E-mail": dados["E-mail"], "Token": token, "Entrada": entrada}


    try{
        // Armazenando um token e o tempo da entrada para efetuar log-out posteriormente
        await db.collection("mywallet-usuario-token").insertOne(dadosDeAutenticacao)
        // Enviando os dados para o frontEnd
        res.status(200).setHeader(`Authorization`, `Bearer ${token}`).send(req.dadosUsuarioBanco)
    
    }catch(e){
        // informações de erro
        console.log("erro ao criação de token: ", e);
        res.status(401).send(`erro ao gerar token ${e}`);
    }
}