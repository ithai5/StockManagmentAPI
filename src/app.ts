import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger/index.swagger";
import cors from "cors";
// ----------------- Routes -----------------
import { auth } from "./routes/auth.route";
import { walletRoutes } from "./routes/wallet.route";
import { authMiddleware } from "./middlewares/authorization/auth.middleware";
import { playerRoutes } from "./routes/player.route";
import { orderRoutes } from "./routes/order.route";
import { stockRoutes } from "./routes/stock.route";

const PORT = process.env.APP_PORT || 4200;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/authorization", auth);
app.use("/wallet", [authMiddleware], walletRoutes);
app.use("/player", [authMiddleware], playerRoutes);
app.use("/order", [authMiddleware], orderRoutes);
app.use("/stock", stockRoutes); //maybe add an authMiddleware

app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

app.get("/call", (req, res) => {
  res.send({ message: "hello there" });
});

app.listen(PORT, () => {
  console.log("Application is running on port: ", PORT);
});
