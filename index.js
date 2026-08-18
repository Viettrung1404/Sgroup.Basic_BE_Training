import express from "express";
import { readData } from "./utils/readData.js";
import router from "./src/route/app.js";

const app = express();
app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
