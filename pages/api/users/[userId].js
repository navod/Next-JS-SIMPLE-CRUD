import connectMongo from "../../../database/connection";
import { deleteUser, getUser, updateUser } from "../../../database/controller";

export default async function handler(req, res) {
  const { method } = req;

  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  switch (method) {
    case "GET":
      getUser(req, res);
    case "PUT":
      updateUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
