import app from "./app.js";
import connectDatabase from "./config/connection.js";
import dotenv from "dotenv";

//Handle the uncaught exeptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
});

//settingup config files
dotenv.config({ path: "./config/.env" });

//db connection
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server start on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
