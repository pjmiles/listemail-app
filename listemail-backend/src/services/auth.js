import argon2 from "argon2";
import jwt from "jsonwebtoken";
import connection from "../dbConfig.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const sql = "SELECT * FROM paygizmologins WHERE EMAILADDRESS = ?";
    const [rows] = await connection.promise().query(sql, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const admin = rows[0];
    const isPasswordValid = await argon2.verify(admin.PASSWORD, password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(admin, process.env.MY_SECRET, { expiresIn: "3h" });
    res.cookie("token", token, { httpOnly: true, maxAge: 36000000 });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Error logging in", db_error: error });
  }
};

export const verifyToken = (req, res, next) => {
  const authToken = req.cookies["token"];
  if (authToken == null) return res.sendStatus(401);
  jwt.verify(authToken, process.env.MY_SECRET, (err, user) => {
    if (err)
      return es.status(403).json({ success: false, message: "Invalid token!" });
    req.user = user;
    next();
  });
};
