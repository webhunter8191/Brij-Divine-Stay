import dotenv from "dotenv"
dotenv.config();
export const rootConfig = {
  db: {
    dbname: process.env.DBNAME || "Brij_divine_database",
    url: process.env.MONGO_URL || "mongodb://localhost:27017",
  },
  server: {
    port: process.env.PORT,
        secret: process.env.JWT_SECRET,
  },
};

