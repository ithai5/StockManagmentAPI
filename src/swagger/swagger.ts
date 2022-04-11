import { SwaggerOptions } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import "dotenv/config";

const port = process.env.APP_PORT || 4200;

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stock Management API",
      version: "1.0.0",
    },
    servers: [
      { url: `http://localhost:${port}`, description: "development server" },
    ],
  },
  securityDefinitions: {
    bearerAuth: {
      type: "jwt",
      name: "Authorization",
      schema: "bearer",
      in: "header",
    },
  },
  apis: ["./src/app.ts", "./src/routes/*.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
