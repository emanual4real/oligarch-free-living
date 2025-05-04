import { hashPassword } from "../auth";
import { config } from "../config";
import { User } from "./models";

const checkForDefaultUser = async () => {
  const admin = await User.findOne({ emailAddress: config.adminEmail });

  if (admin) {
    return true;
  }

  return false;
};

const createAdminUser = async () => {
  const { adminEmail, adminPassword } = config;

  if (adminEmail && adminPassword) {
    const hashedPassword = await hashPassword(adminPassword);
    await User.create({
      emailAddress: config.adminEmail,
      password: hashedPassword,
    });
  } else {
    throw new Error("missing adminEmail and adminPassword");
  }
};

export const createDefaultAdmin = async () => {
  const adminExists = await checkForDefaultUser();

  if (!adminExists) {
    await createAdminUser();
  }
};
