import argon2 from "argon2";
import connection from "../dbConfig.js";

const admins = [
  {
    email: "abi@gridirontest.com",
    tenant: "ega-gridiron",
    password: "password1",
  },
  {
    email: "ruth@gridirontest.com",
    tenant: "ega-gridiron",
    password: "password2",
  },
  {
    email: "niran@gridirontest.com",
    tenant: "ega-gridiron",
    password: "password3",
  },
  {
    email: "victor@gridirontest.com",
    tenant: "ega-gridiron",
    password: "password4",
  },
];

export const createDefaultAdmins = async () => {
  try {
    for (const admin of admins) {
      const sqlCheck =
        "SELECT COUNT(*) AS count FROM paygizmologins WHERE EMAILADDRESS = ?";
      const [rows] = await connection.promise().query(sqlCheck, [admin.email]);
      const adminExists = rows[0].count > 0;

      if (!adminExists) {
        const hashPassword = await argon2.hash(admin.password);
        const sqlInsert = `INSERT INTO paygizmologins (EMAILADDRESS, PASSWORD, TENANT) VALUES (?, ?, ?)`;
        await connection
          .promise()
          .query(sqlInsert, [admin.email, hashPassword, admin.tenant]);
        console.log(`Admin ${admin.email} inserted successfully`);
      } else {
        console.log(`Admin ${admin.email} already exists`);
      }
    }
  } catch (error) {
    console.error("Error creating default admin users:", error.message);
  }
};

export const createAdminUser = async (req, res) => {
  const { email, password } = req.body;
  const tenant = req?.user?.tenant || "Ega";
  try {
    const sqlCheck =
      "SELECT COUNT(*) AS count FROM paygizmologins WHERE EMAILADDRESS = ? AND TENANT = ?";
    const [rows] = await connection.promise().query(sqlCheck, [email, tenant]);
    const adminExists = rows[0].count > 0;

    if (!adminExists) {
      const hashedPassword = await argon2.hash(password);
      const sqlInsert = `INSERT INTO paygizmologins (EMAIL, PASSWORD, TENANT) VALUES (?, ?, ?)`;
      await connection
        .promise()
        .query(sqlInsert, [email, hashedPassword, tenant]);
      res.status(201).json(`Admin ${email} inserted successfully`);
    } else {
      res
        .status(409)
        .json(`Admin ${email} already exists for tenant ${tenant}`);
    }
  } catch (error) {
    console.error("Error creating admin user:", error.message);
    res.status(500).json("Error creating admin user");
  }
};

export const listAdmin = (req, res) => {
  const tenant = req.user?.tenant;
  const statement = tenant
    ? [
        "SELECT UUID, EMAILADDRESS, TENANT FROM paygizmologins WHERE TENANT = ?",
        [tenant],
      ]
    : ["SELECT UUID, EMAILADDRESS, TENANT FROM paygizmologins"];
  connection.query(...statement, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: "Server error" });
    }
    const filteredResults = results.filter(
      (result) => result.EMAILADDRESS !== "admin@admin.com"
    );
    if (filteredResults.length === 0) {
      return res.status(404).json({ message: "No admins found" });
    }
    res.status(200).json(filteredResults);
  });
};
