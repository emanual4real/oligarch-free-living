import oligarchJson from "./data/oligarch.json";
import { company, oligarch, product } from "./db/models";

const deleteAllOligarchs = async () => {
  await oligarch.deleteMany({}).exec();
};

const deleteAllCompanies = async () => {
  await company.deleteMany({}).exec();
};

const deleteAllProducts = async () => {
  await product.deleteMany({}).exec();
};

const createOligarchsFromJson = async () => {
  const seedData = oligarchJson.map((row) => ({
    name: row.name,
    companies: row.companies,
    oligarchRating: row.oligarchRating,
    description: row.description,
    sources: row.sources,
  }));
  console.log("seedData", seedData);
  await oligarch.create(seedData);
};

export const seedDatabase = async () => {
  await deleteAllOligarchs();
  await deleteAllCompanies();
  await deleteAllProducts();

  await createOligarchsFromJson();
  // await product.create({
  //   productName: "Facebook",
  //   productType: "Social Media",
  //   company: "Meta",
  //   alternatives: [
  //     "Mastodon",
  //     "Diaspora",
  //     "Vero",
  //     "Minds",
  //     "WT.Social",
  //     "MeWe",
  //     "Ello",
  //   ],
  //   sources: ["https://smartblogger.com/facebook-alternatives/"],
  // });
};
