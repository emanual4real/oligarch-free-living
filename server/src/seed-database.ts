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

const createCompaniesFromJson = async () => {
  const companySet = new Set<string>();
  productJson.forEach((row) => {
    companySet.add(row.company);
  });
  const companyList = Array.from(companySet).map((row) => ({
    companyName: row,
  }));

  await Company.insertMany(companyList);
};

// const createOligarchsFromJson = async () => {
//   const seedData = oligarchJson.map((row) => ({
//     name: row.name,
//     companies: row.companies,
//     oligarchRating: row.oligarchRating,
//     description: row.description,
//     sources: row.sources,
//   }));

//   await oligarch.create(seedData);
// };

const createProductsFromJson = async () => {
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
        // {upsert: true}
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

    // console.log("product", product);
    // console.log("company", company);

    // if (company) {
    //   try {
    //     await Company.updateOne(
    //       { _id: company._id },
    //       { products: [...company.products, product._id] }
    //     );
    //   } catch (err) {
    //     console.log("update error", err);
    //   }
    // } else {
    // try {
    // await Company.insertOne({
    // companyName: row.company,
    // products: [product],
    // });
    // } catch (err) {
    // console.log("insert error", err);
    // }
    // }
  }

  // seedData.forEach((row) => {
  //   (async () => {
  //     const product = await Product.insertOne(row);
  //     console.log("companyName", row.company);
  //     let company = await Company.findOne({ companyName: row.company }).exec();
  //     console.log("company find", company);
  //     if (company) {
  //       // update
  //       await Company.updateOne(
  //         { _id: company._id },
  //         { products: [...company.products, product._id] }
  //       );
  //       console.log("company update");
  //     } else {
  //       await Company.insertOne({
  //         companyName: row.company,
  //         products: [product._id],
  //       });
  //       console.log("company create");
  //     }
  //   })();
  // });

  // const company = await Company.insertOne({ companyName: seedData[0].company });
  // await Product.insertOne({ ...seedData[0], company: company._id });
};

export const seedDatabase = async () => {
  await deleteAllOligarchs();
  await deleteAllCompanies();
  await deleteAllProducts();

  // await createCompaniesFromJson();
  // await createOligarchsFromJson();
  await createProductsFromJson();
};
