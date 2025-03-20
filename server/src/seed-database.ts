import oligarchJson from "./data/oligarch.json";
import productJson from "./data/products.json";
import { Company, Oligarch, Product } from "./db/models";

const deleteAllOligarchs = async () => {
  await Oligarch.deleteMany({}).exec();
};

const deleteAllCompanies = async () => {
  await Company.deleteMany({}).exec();
};

const deleteAllProducts = async () => {
  await Product.deleteMany({}).exec();
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

  await createProductsAndCompaniesFromJson();
  await createOligarchsFromJson();
};
