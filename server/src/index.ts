import cors, { CorsOptions } from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { config } from "./config";
import { companyRouter, oligarchRouter, productRouter } from "./routes";
import { seedDatabase } from "./seed-database";

// mongoose connection
async function connectDatabase() {
  try {
    const mongoUrl = config.mongoUrl;
    if (mongoUrl) {
      await mongoose.connect(mongoUrl);
    }
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
app.use(helmet());

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
