import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger/index.swagger";
import cors from "cors";
import { auth } from "./routes/auth.route";

const PORT = process.env.APP_PORT || 4200;

const app = express();
app.use(express.json());
app.use("/authorization", auth);
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.listen(PORT, () => {
  console.log("Application is running on port: ", PORT);
});
