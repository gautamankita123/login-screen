const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Store registered email IDs in an array
const registeredEmails = [];

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/login", function (req, res) {
    // Retrieve login credentials
    const email = req.body.email;
    const password = req.body.password;

    // Check if the email is registered
    if (registeredEmails.includes(email)) {
        return res.json({ success: false, message: "Email already registered. Please login instead." });
    }

    // Perform login logic here (e.g., validate credentials)

    // Simulating a successful login
    if (email === "example@example.com" && password === "password") {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.json({ success: false, message: "Incorrect email or password." });
    }
});

app.post("/signup", function (req, res) {
    // Retrieve form data
    const email = req.body.email;

    // Check if the email is already registered
    if (registeredEmails.includes(email)) {
        return res.json({ success: false, message: "Email already registered." });
    }

    // Add the email to the registeredEmails array
    registeredEmails.push(email);

    // Perform signup logic here (e.g., store user data in a database)

    // Return a response to the client
    res.json({ success: true, message: "Registered successfully. You can now login." });
});

const port = 3000;
app.listen(port, function () {
    console.log(port);
});