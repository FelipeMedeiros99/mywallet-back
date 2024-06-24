import chalk from "chalk";
import db from "../banco.js";

export default async function emailJaCadastradoMiddleware(req, res, next){
    const {body:dados} = req
    try{
        const emailDeUsuarioJaExiste = await db.collection("usuarios").findOne({"E-mail": dados['E-mail']})
        if(emailDeUsuarioJaExiste!==null){
            console.log(chalk.red("Email já cadastrado"));
            return res.status(409).send("Este email já está cadastrado");
        }
        
        next();

    }catch(e){
        console.log(e);
        return res.sendStatus(404);
    }
}