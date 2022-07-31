// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "../../../database/connection";
import { addUsers, getUsers } from "../../../database/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  const { method } = req;

  switch (method) {
    case "GET":
      getUsers(req, res);
      break;
    case "POST":
      addUsers(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
