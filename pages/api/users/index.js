// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from "../../../database/connection";
import { addUsers, getUsers } from "../../../database/controller";
import cors from "cors";

const corsMiddleware = cors({
  origin: "*",
});

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  const { method } = req;

  switch (method) {
    case "GET":
      middleware(req, res, () => {
        getUsers(req, res);
      });

      break;
    case "POST":
      middleware(req, res, () => {
        addUsers(req, res);
      });

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export function middleware(req, res, next) {
  corsMiddleware(req, res, (err) => {
    if (err) {
      return res.status(500).send("Something went wrong");
    }
    next();
  });
}
