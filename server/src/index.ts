import cors, { CorsOptions } from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";
import { authenticated } from "./auth";
import { config } from "./config";
import { createDefaultAdmin } from "./db";
import { seedDatabase } from "./db/seed-database";
import {
  authRouter,
  companyRouter,
  oligarchRouter,
  photoRouter,
  politicianRouter,
  productRouter,
  project2025Router,
  searchRouter,
  userRouter,
} from "./routes";

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

const main = async () => {
  // Create a new express application instance
  const app = express();
  connectDatabase();
  createDefaultAdmin();

  if (config.seed) {
    console.log("seeding database");
    await seedDatabase();
  }

  const corsOptions: CorsOptions = {
    origin: config.client || "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };

  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(express.json());

  // Set the network port
  const port = config.port || 3000;

  // Define the root path with a greeting message
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
  });

  app.use(
    express.static(path.join(__dirname, "public"), {
      setHeaders: (res) => {
        res.set("Cross-Origin-Resource-Policy", "cross-origin");
      },
    })
  );
  app.use("/auth", authRouter);
  app.use("/oligarchs", oligarchRouter);
  app.use("/companies", companyRouter);
  app.use("/photos", photoRouter);
  app.use("/products", productRouter);
  app.use("/project2025", project2025Router);
  app.use("/politicians", politicianRouter);
  app.use("/search", searchRouter);
  app.use("/users", authenticated, userRouter);

  // Start the Express server
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
  });
};

main();
