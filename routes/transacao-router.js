import { Router } from "express"
import validacaoDeTokenMiddleware from "../middlewares/verificacaoDeToken.js"

const transacaoRouter = Router()


transacaoRouter.post("/entrada", validacaoDeTokenMiddleware)
transacaoRouter.post("/saida", validacaoDeTokenMiddleware)

export default transacaoRouter