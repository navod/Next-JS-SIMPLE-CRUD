import Users from "../model/user";

export async function getUsers(req, res) {
  try {
    const users = await Users.find({});

    if (!users) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

export async function getUser(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(404).json({ error: "User not Selected...!" });
    } else {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: "Cannot get the User...!" });
  }
}

export async function addUsers(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(404).json({ error: "Form data not provided..!" });
    }
    Users.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json(error);
  }
}

export async function updateUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }

    res.status(404).json({ error: "user not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while Updating the data" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      res.status(200).json({ deleted: userId });
    }

    res.status(404).json({ error: "user not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the data" });
  }
}
