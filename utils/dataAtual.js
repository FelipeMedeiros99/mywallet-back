export default function dataAtual(){
    const hoje = new Date()
    const dia = String(hoje.getDate()).padStart(2, "0")
    const mes = String(hoje.getMonth()+1).padStart(2, "0")
    const ano = String(hoje.getFullYear())
    return `${dia}/${mes}/${ano}`
}