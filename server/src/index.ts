import cors, { CorsOptions } from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "./config";
import { companyRouter, oligarchRouter, productRouter } from "./routes";
import { seedDatabase } from "./seed-database";

// mongoose connection
async function connectDatabase() {
  try {
    // await mongoose.connect("mongodb://user:password@127.0.0.1:27017/test");
    const host = config.mongoHost;
    const user = config.mongoUser;
    const pw = config.mongoPw;
    const db = config.mongoDb;
    await mongoose.connect(`mongodb://${user}:${pw}@${host}/${db}`);
  } catch (err) {
    console.log("err", err);
  }
}

(() => {
  connectDatabase();
})();

// Create a new express application instance
const app = express();
connectDatabase();

if (config.seed) {
  (async () => {
    console.log("seeding database");
    await seedDatabase();
  })();
}

const corsOptions: CorsOptions = {
  origin: config.client || "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

// Set the network port
const port = config.port || 3000;

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});
app.use("/oligarchs", oligarchRouter);
app.use("/companies", companyRouter);
app.use("/products", productRouter);

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
