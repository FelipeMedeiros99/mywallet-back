import db from "../banco.js";
import { editarTransacaoSchema } from "../schemas.js";
import filtroErroSchemas from "../utils/filtroErroSchemas.js";


export default async function editarTransacaoController(req, res){
    const {body} = req;

    try{
        // validando dados
        await editarTransacaoSchema.validateAsync(body, {abortEarly: false});
        
        const filtro = {
            "E-mail": req["E-mail"],
            [`${body.Tipo}.Id`]: body.Id
        };

        const alteracao = {
            $set:{
                [`${body.Tipo}.$.Descricao`]: body.Descricao,
                [`${body.Tipo}.$.Valor`]: body.Valor
            }
        };
        
        // Alterando elemento
        const dados = await db.collection("mywallet-usuarios").findOneAndUpdate(filtro, alteracao, {returnDocument: "after"});

        // deletando dados restritos
        delete dados["E-mail"]
        delete dados.Senha;

        // retornando dados atualizados
        res.status(201).send(dados);

        
    }catch(e){
        const erros = filtroErroSchemas(e)
        console.log("Erro ao editar transação: ", erros||e);
        res.status(400).send(`Erro ao editar transação: ${erros||e}`);
    }
}