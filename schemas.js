import Joi from "joi";

export const novoUsuarioSchema = Joi.object({
    "Nome": Joi.string().min(1).required(),
    "E-mail": Joi.string().email().required(),
    "Senha": Joi.string().pattern(new RegExp('[a-zA-Z0-9]')).min(6).required(),
    "Confirmar": Joi.string().valid(Joi.ref("Senha")).required(),
})

export const usuarioSchema = Joi.object({
    "Email": Joi.string().email().required(),
    "Senha": Joi.string().min(6)
})

