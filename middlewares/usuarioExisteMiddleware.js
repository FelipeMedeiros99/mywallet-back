import bcrypt from "bcrypt"

import db from "../banco.js";
import { usuarioSchema } from "../schemas.js";

/**
 * Validação se usuário existe no banco de dados
 */
export async function usuarioExisteMiddleware(req, res, next){
    const {body: dados} = req;

    try{
        // validando se os dados foram enviados corretamente
        await usuarioSchema.validateAsync(dados);
        // buscando dados no banco
        const dadosUsuarioBanco = await db.collection("mywallet-usuarios").findOne({"E-mail": dados["E-mail"]});
        
        // salvando nos dados temporários do middleware
        req.dadosUsuarioBanco = dadosUsuarioBanco;

        // retornando erro caso usuário não exista
        if(dadosUsuarioBanco === null){
            return res.status(401).send("Usuário não encontrado");
        }         
        console.log("usuario encontrado")
        next();

    }catch(e){
        const erro = e.details?.map(e=>e.message);
        console.log("erro ao localizar usuário: ", erro||e);
        return res.status(401).send(`Erro ao realizar login: ${erro||e}`);
    }

};

/**
 * Validação se senha confere com dados do usuário
 */
export async function senhaConfereMiddleware(req, res, next){
    
    const { body: dados } = req;
    const dadosUsuarioBanco = req.dadosUsuarioBanco;
    
    try{
        const validacaoSenha = await bcrypt.compare(dados.Senha, dadosUsuarioBanco.Senha);
        // validação se senha está correta
        if(!validacaoSenha){
            return res.status(401).send("Senha incorreta");
        }
        // caso esteja correto, segue para o próximo middleware
        console.log("senha aceita")
        next();

    }catch(e){
        console.log("Erro na validação de senha: ", e);
        res.status(401).send("Erro ao validar senha");
    };
};
