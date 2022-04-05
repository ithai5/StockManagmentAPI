import express = require("express");
import "dotenv/config";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const port = process.env.APP_PORT || 4201;

const app = express();

// --------------------------- Swagger ---------------------------
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'api title1',
      description: 'api description',
      servers: [`http://localhost:${port}`],
    }
  },
  apis: ["./src/app.ts"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// ---------------------------------------------------------------

app.get("/", async (req, res) => {
  res.send({ message: "hello world2" });
});

// Testing swagger documentation: 
/**
 * @swagger
 * /findAll:
 *  get:
 *    description: Default api, returns 'hello world'
 *    responses:
 *      '200':
 *        description: A succesful response
 */
app.get('/findAll', async (req: express.Request, res: express.Response) => {
  const result = await prisma.wallet.findMany();
  res.send({success: result});
});


app.listen(port, () => {
  console.log("Application is running on port: ", port);
});

/*figure out about session tokens + identity
 *login
 *  post(/login, (email, encrypted password) => sort of session token / access deny)
 *  get(/wallet, (token)=> list of wallet)
 *  get(/stocks in wallet, (somehow token + wallet id) => list of stocks in the wallet)
 *  post(/buy a stock, (token, wallet id, stock, amount) => return updated wallet)
 * */
