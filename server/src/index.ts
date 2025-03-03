import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";

// Create a new express application instance
const app = express();
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

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
