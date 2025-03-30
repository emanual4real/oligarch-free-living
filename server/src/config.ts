export const config = {
  port: parseInt(process.env.PORT ?? ""),
  client: process.env.CLIENT,
  seed: process.env.SEED === "true" ? true : false,
  mongoUrl: process.env.MONGO_URL,
};
