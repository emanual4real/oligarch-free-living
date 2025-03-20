export const config = {
  port: parseInt(process.env.PORT ?? ""),
  client: process.env.CLIENT,
  seed: process.env.SEED === "true" ? true : false,
  mongoHost: process.env.MONGO_HOST,
  mongoUser: process.env.MONGO_USER,
  mongoPw: process.env.MONGO_PW,
  mongoDb: process.env.MONGO_DB,
};
