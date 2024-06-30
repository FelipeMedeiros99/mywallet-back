import db from "../banco.js"


/**
 * deleta transações pelo id
 */
export default async function deletarTransacaoController(req, res){
    const {body: dados} = req;
    try{
        // deletando 
        await db.collection("mywallet-usuarios").updateOne(
            {"E-mail": req["E-mail"]}, 
            {$pull: {Entradas: { "Id": dados.Id }}}
        );

        // enviando dados atualizados

        const dadosAtualizados = await db.collection("mywallet-usuarios").findOne({"E-mail": req["E-mail"]})

        // impedindo que a senha senha enviada
        delete dadosAtualizados.Senha

        // enviando os dados atualizados
        return res.status(200).send(dados)
    }catch(e){
        console.log("Erro ao apagar transação: ", e);
        res.status(400).send(`Erro ao apagar transação: ${e}`);
    }
}