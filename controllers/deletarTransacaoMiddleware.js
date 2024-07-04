import db from "../banco.js";
import { validaIdTransacaoSchema } from "../schemas.js";
import filtroErroSchemas from "../utils/filtroErroSchemas.js";


/**
 * deleta transações pelo id
 */
export default async function deletarTransacaoController(req, res){
    const {body: dados} = req;
    try{

        await validaIdTransacaoSchema.validateAsync(dados, {abortEarly: false})

        // deletando 
        let dadosAtualizados = await db.collection("mywallet-usuarios").findOneAndUpdate(
            {"E-mail": req["E-mail"]}, 
            {$pull: {Entradas: { "Id": dados.Id }, Saidas: {"Id": dados.Id}}}, {returnDocument: "after"});

        
        let soma = 0
        dadosAtualizados?.Entradas?.map((objeto)=>soma+=objeto.Valor)
        dadosAtualizados?.Saidas?.map((objeto)=>soma+=objeto.Valor)
        
        dadosAtualizados = await db.collection("mywallet-usuarios").findOneAndUpdate({"E-mail": req["E-mail"]}, {$set: {Saldo: soma}}, {returnDocument: "after"})
        

        // impedindo que a senha senha enviada
        delete dadosAtualizados["E-mail"];
        delete dadosAtualizados.Senha;

        // enviando os dados atualizados
        return res.status(200).send(dadosAtualizados);
    }catch(e){
        const erro = filtroErroSchemas(e)
        console.log("Erro ao apagar transação: ", erro||e);
        res.status(400).send(`Erro ao apagar transação: ${erro||e}`);
    }
}