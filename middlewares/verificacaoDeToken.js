import db from "../banco.js"

/**
 * valida se o token é válido
 */

export default async function validacaoDeTokenMiddleware(req, res, next){
    const {headers} = req;
    const token = headers.authorization.split(" ")[1]
    req.token = token

    try{
        // buscando token do usuário
        const validadeUsuario = await db.collection("mywallet-usuario-token").findOne({"Token": token})

        // salvando os dados do usuário no req
        req.validadeUsuario = validadeUsuario

        // salvando email de usuario         
        req["E-mail"] = validadeUsuario["E-mail"]

        // em caso de token expirado
        if(validadeUsuario===null){
            console.log("Token expirado");
            return res.status(401).send(`Token expirado`);
        }
        next()

    }catch(e){
        // validações de erros
        console.log("Token expirado/inválido: ", e);
        return res.status(401).send(`Token expirado: ${e}`);
    }
}