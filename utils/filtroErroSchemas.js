export default function filtroErroSchemas(e){
    const erros = e.details?.map((erro)=>erro.message)
    return erros
}