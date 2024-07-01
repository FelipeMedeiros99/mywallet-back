import db from "../banco.js";
import { transacaoSchema } from "../schemas.js";
import dataAtual from "../utils/dataAtual.js";
import filtroErroSchemas from "../utils/filtroErroSchemas.js";



/**
 * Salva no banco de dados a nova entrada
 */
export default async function transacoesController(req, res){
    const {body: informacoesEntrada} = req;
    
    
    try{
        // validando se a entrada segue o modelo padão
        await transacaoSchema.validateAsync(informacoesEntrada, {abortEarly: false});
        // dados que serão alterados
        let atualizacao;
        if(informacoesEntrada.Valor>=0){
            atualizacao = {
            $inc: {Saldo: informacoesEntrada.Valor}, 
            $push: {Entradas: {
                    "Descricao": informacoesEntrada.Descricao,
                    "Valor": informacoesEntrada.Valor,
                    "Data": dataAtual(),
                    "Id": Date.now()
                }}};
        }else{
            atualizacao = {
                $inc: {Saldo: informacoesEntrada.Valor}, 
                $push: {Saidas: {
                        "Descricao": informacoesEntrada.Descricao,
                        "Valor": informacoesEntrada.Valor,
                        "Data": dataAtual(), 
                        "Id": Date.now()
                    }}};
        }
        
        // salvando no banco de dados 
        const dadosAtualizados = await db.collection("mywallet-usuarios").findOneAndUpdate({"E-mail": req["E-mail"]}, atualizacao, {returnDocument: "after"});
        console.log("Dados atualizados com sucesso");

        // removendo dados sensíveis
        delete dadosAtualizados['E-mail'];
        delete dadosAtualizados.Senha;

        return res.status(201).send(dadosAtualizados);
        
    }catch(e){
        const erros = filtroErroSchemas(e);
        console.log("erro ao salvar transação: ", erros||e);
        res.status(401).send(`Erro ao salvar transação: ${erros||e}`);
    }

}