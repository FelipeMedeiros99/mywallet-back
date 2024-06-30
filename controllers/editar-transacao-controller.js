import db from "../banco.js";
import { editarTransacaoSchema } from "../schemas.js";

// TODO: FAZER A ALTERAÇÃO DE DADOS NO BANCO DE DADOS

export default async function editarTransacaoController(req, res){
    const {body} = req;
    console.log("body: ", body)
    try{
        // validando dados
        await editarTransacaoSchema.validateAsync(body, {abortEarly: false});
        
        // buscando dados do usuário
        let dadosDoBanco = await db.collection("mywallet-usuarios").findOne({"E-mail": req["E-mail"]})

        console.log("dados do banco: ", dadosDoBanco)
        
        console.log("Dados entrada: ", dadosDoBanco[`${body["Tipo"]}`])

        // console.log("Dados do banco: ", dadosDoBanco[body["Tipo"]])


        res.sendStatus(201)

        
    }catch(e){
        console.log("Erro ao editar transação");
        res.status(400).send(`Erro ao editar transação: ${e}`);
    }
}