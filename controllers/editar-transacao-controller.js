import { ReturnDocument } from "mongodb";
import db from "../banco.js";
import { editarTransacaoSchema } from "../schemas.js";
import filtroErroSchemas from "../utils/filtroErroSchemas.js";

// TODO: FAZER A ALTERAÇÃO DE DADOS NO BANCO DE DADOS

export default async function editarTransacaoController(req, res){
    const {body} = req;
    
    try{
        // validando dados
        await editarTransacaoSchema.validateAsync(body, {abortEarly: false});
        
        const filtro = {
            "E-mail": req["E-mail"],
            [`${body["Tipo"]}.Id`]: body.Id
        }

        console.log("Filtro:", filtro)
        
        const alteracao = {
            $set:{
                "Entradas.$.Descricao": body.Descricao,
                "Entradas.$.Valor": body.Valor
            }
        }
        
        // Alterando elemento
        const dados = await db.collection("mywallet-usuarios").findOneAndUpdate(filtro, alteracao, {returnDocument: "after"})

        // deletando dados restritos
        delete dados.Senha

        // retornando dados atualizados
        res.status(201).send(dados)

        
    }catch(e){
        const erros = filtroErroSchemas(e)
        console.log("Erro ao editar transação: ", erros||e);
        res.status(400).send(`Erro ao editar transação: ${erros||e}`);
    }
}