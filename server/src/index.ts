import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import mongoose from "mongoose";
import { companyRouter, oligarchRouter, productRouter } from "./routes";

// mongoose connection
async function connectDatabase() {
  await mongoose.connect("mongodb://user:password@127.0.0.1:27017/test");
  // await mongoose.connect("mongodb://user:password@localhost:27017/test");
}

(() => {
  connectDatabase();
})();

// Create a new express application instance
const app = express();
connectDatabase();
const corsOptions: CorsOptions = {
  origin: process.env.CLIENT || "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

// Set the network port
const port = process.env.PORT || 3000;

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});
app.use("/oligarch", oligarchRouter);
app.use("/company", companyRouter);
app.use("/product", productRouter);

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
