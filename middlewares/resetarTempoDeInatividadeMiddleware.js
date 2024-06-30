import db from "../banco.js"

export default async function restarTempoDeInatividadeMiddleware(req, res, next){
    const validadeUsuario = req.validadeUsuario

    try{
        // atualizando a última interação do usuário
        await db.collection("mywallet-usuario-token").updateOne({"Token": validadeUsuario.Token}, {$set: {Entrada: Date.now()}})
        next()
        
    }catch(e){
        console.log("Erro ao resetar tempo de inatividade: ", e)
        res.status(400).send(`Erro ao resetar tempo de inatividade: ${e}`)
    }
}