import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.js";
import hbs from 'express-handlebars'
import expressLayout from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//import all routes
import auth from "./routes/auth.js";
import product from "./routes/product.js";

//set Template engine
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.use("/api", auth);
app.use("/api", product);

//middle ware for handle error
app.use(errorMiddleware);

app.use(express.static('public'))

export default app;
