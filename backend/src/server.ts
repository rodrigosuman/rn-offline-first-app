import express from "express";
import routes from "./routes";

import "reflect-metadata";
import "./database";

const app = express();

app.get("/", (request, response) => {
  return response.json({
    message: "Hello World!",
  });
});

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
});
