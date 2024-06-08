import connection from "../dbConfig.js";

export const createEmail = (req, res) => {
  const {
    emailaddress = "admin@gridirontest.com",
    email,
    status = "pending",
    message,
  } = req.body;
  const query =
    "INSERT INTO paygizmoseshtml (emailaddress, recipient, status, emailtemplate, datetimestampid) VALUES (?, ?, ?, ?, ?)";
  const datetimestampid = Date.now().toString();
  const values = [emailaddress, email, status, message, datetimestampid];
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
    res.json({ message: "Record inserted successfully", id: datetimestampid });
  });
};

export const createBukEmail = (req, res) => {
  const {
    emailaddress = "admin@gridirontest.com",
    emails,
    status = "pending",
    message,
  } = req.body;
  const query =
    "INSERT INTO paygizmoseshtml (emailaddress, recipient, status, emailtemplate, datetimestampid) VALUES ?";
  const datetimestampid =
    Date.now().toString() + Math.random().toString(36).substring(7);
  const values = emails.map((email) => [
    emailaddress,
    email,
    status,
    message,
    datetimestampid,
  ]);

  connection.query(query, [values], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
    res.json({ message: "Records inserted successfully" });
  });
};
