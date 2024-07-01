import db from "../banco.js";


/**
 * deleta transações pelo id
 */
export default async function deletarTransacaoController(req, res){
    const {body: dados} = req;
    try{

        // deletando 
        const dadosAtualizados = await db.collection("mywallet-usuarios").findOneAndUpdate(
            {"E-mail": req["E-mail"]}, 
            {
                $pull: {Entradas: { "Id": dados.Id }},
                $pull: {Saidas: {"Id": dados.Id}},
            }, {returnDocument: "after"});

        // impedindo que a senha senha enviada
        delete dadosAtualizados["E-mail"];
        delete dadosAtualizados.Senha;

        // enviando os dados atualizados
        return res.status(200).send(dados);
    }catch(e){
        console.log("Erro ao apagar transação: ", e);
        res.status(400).send(`Erro ao apagar transação: ${e}`);
    }
}