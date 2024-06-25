import db from "../banco.js"

/**
 * Função busca no banco o tempo que o usuário já está online e o desloga em caso de inatividade
 */
export default async function controleLogout(){
    const tempoAtual = Date.now()
    const tempoMinimo = tempoAtual - (1000 * 60 *5)
    try{
        await db.collection("mywallet-usuario-token").deleteMany({Entrada: {$lt: tempoMinimo}})
    }catch(e){
        console.log("Erro ao remover usuarios inativos: ", e)
    }
}