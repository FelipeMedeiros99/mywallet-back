import Joi from "joi";

export const novoUsuarioSchema = Joi.object({
    "Nome": Joi.string().min(1).required(),
    "E-mail": Joi.string().email().required(),
    "Senha": Joi.string().pattern(new RegExp('[a-zA-Z0-9]')).min(6).required(),
    "Confirmar": Joi.string().valid(Joi.ref("Senha")).required(),
})

export const usuarioSchema = Joi.object({
    "E-mail": Joi.string().email().required(),
    "Senha": Joi.string().min(6).required()
})

export const transacaoSchema = Joi.object({
    "Descricao": Joi.string().min(3).required(),
    "Valor": Joi.number().precision(2).required(),
})

export const editarTransacaoSchema = Joi.object({
    "Tipo": Joi.valid("Entrada", "Saida").required(),
    "Descricao": Joi.string().min(3).required(),
    "Valor": Joi.number().precision(2).required(),
    "Id": Joi.number().min(13).required()
})