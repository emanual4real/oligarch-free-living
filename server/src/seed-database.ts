import oligarchJson from "./data/oligarch.json";
import productJson from "./data/products.json";
import project2025Json from "./data/project2025.json";
import { Company, Oligarch, Product, Project2025 } from "./db/models";

const deleteAllOligarchs = async () => {
  await Oligarch.deleteMany({}).exec();
};

const deleteAllCompanies = async () => {
  await Company.deleteMany({}).exec();
};

const deleteAllProducts = async () => {
  await Product.deleteMany({}).exec();
};

const deleteAllProject2025 = async () => {
  await Project2025.deleteMany({}).exec();
};

const createProject2025FromJson = async () => {
  const seedData = project2025Json.map((row) => ({
    name: row.name,
    sources: [row.source],
  }));

  await Project2025.insertMany(seedData);
};

const createOligarchsFromJson = async () => {
  const seedData = oligarchJson.map((row) => ({
    name: row.name,
    companies: row.companies,
    oligarchRating: row.oligarchRating,
    description: row.description,
    sources: row.sources,
  }));

  for (let i = 0; i < seedData.length; i++) {
    const row = seedData[i];

    const companies = await Company.find({ companyName: row.companies }).exec();
    const companyIds = companies.map((row) => row._id);
    await Oligarch.create({
      ...row,
      companies: companyIds,
    });
  }
};

const createProductsAndCompaniesFromJson = async () => {
  const seedData = productJson.map((row) => ({
    productName: row.productName,
    productType: row.productType,
    company: row.company,
    alternatives: row.alternatives,
    sources: row.sources,
  }));

  for (let i = 0; i < seedData.length; i++) {
    const row = seedData[i];

    const product = await Product.insertOne({
      productName: row.productName,
      productType: row.productType,
      alternatives: row.alternatives,
      sources: row.sources,
    });

    let company = await Company.findOne({ companyName: row.company }).exec();

    if (company) {
      company = await Company.findOneAndUpdate(
        { _id: company._id },
        { products: [...company.products, product._id] }
      ).exec();
    } else {
      company = await Company.insertOne({
        companyName: row.company,
        products: [product._id],
      });
    }
    if (company) {
      await Product.updateOne({ _id: product._id }, { company: company._id });
    }
  }
};

export const seedDatabase = async () => {
  await deleteAllOligarchs();
  await deleteAllCompanies();
  await deleteAllProducts();
  await deleteAllProject2025();

  await createProductsAndCompaniesFromJson();
  await createOligarchsFromJson();
  await createProject2025FromJson();

  console.log("Seeding database complete");
};
