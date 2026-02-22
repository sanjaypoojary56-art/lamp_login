const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
