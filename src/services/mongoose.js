import config from 'config';
import { connect } from "mongoose";

const uri = `${config.get("db.mongoDBurl.base")}${process.env.MONGODB_USER}:${
  process.env.MONGODB__PASSWORD
}${config.get("db.mongoDBurl.path")}`;

export default async function main() {
  await connect(uri)
  console.log("-connect-");
}

