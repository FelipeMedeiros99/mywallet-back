import chalk from "chalk";
import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config();

let db;

// Configuração do banco
const mongoClient = new MongoClient(process.env.BANCO);
try{
    await mongoClient.connect();
    db = mongoClient.db("meu-banco")
    console.log(chalk.green("Banco de dados conectado"))
}catch(e){
    console.log(chalk.red("erro ao conectar ao banco de dados"))
}

export default db

