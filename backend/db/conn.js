const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.1a5ptll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );

  console.log("Conectado ao mongoDB com sucesso");
}

main().catch((err) => console.log(err));

module.exports = main;