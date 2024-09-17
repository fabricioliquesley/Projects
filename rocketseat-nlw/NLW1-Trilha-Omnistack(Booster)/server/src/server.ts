import express, { json } from "express";
import { routes } from "./routes";
import { resolve } from "node:path";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use(routes);

app.use("/uploads", express.static(resolve(__dirname, "..", "uploads")));

app.listen(3333, () => {
  console.log("🚀 Server listening on port 3333");
});
