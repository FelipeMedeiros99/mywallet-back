import { v4 as uuid } from "uuid"

// TODO: gerar Token de acesso para usuário, bem como um timer de validade do token

export default async function criacaoDeToken(req, res){
    const { body: dados } = req;

    console.log(v4)

    try{
        res.sendStatus(200)
    }catch(e){
        console.log("erro ao criação de token");
        res.status(401).send("erro ao gerar token");
    }
}