import { SwaggerOptions } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import "dotenv/config";

const port = process.env.APP_PORT || 4200;

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stock Management API",
      servers: [`http://localhost:${port}`],
    },
  },
  apis: ["./src/app.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
