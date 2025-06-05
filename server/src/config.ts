export const config = {
  port: parseInt(process.env.PORT ?? ""),
  client: process.env.CLIENT,
  seed: process.env.SEED === "true" ? true : false,
  mongoUrl: process.env.MONGO_URL,
  authSecret: process.env.AUTH_SECRET ?? "",
  authExp: process.env.AUTH_EXP ?? "300",
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  photoPath: process.env.PHOTO_PATH,
};
