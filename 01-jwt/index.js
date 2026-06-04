const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json()); // Frontend se aane wale JSON data ko padhne ke liye

const JWT_SECRET = "priyanshu_secret_key"; 
const users = []; // Temporary Database (Array)

// 1. SIGNUP ROUTE
app.post("/signup", function(req, res) {
    const { username, password } = req.body;
    
    // Check agar user pehle se list me hai
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });
    res.json({ message: "You are signed up" });
});

// 2. SIGNIN ROUTE
app.post("/signin", function(req, res) {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // User valid hai, toh token generate karke return karenge
        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.json({ token: token });
    } else {
        res.status(403).json({ message: "Invalid credentials" });
    }
});

// 3. AUTH MIDDLEWARE (Token verification guard)
function authMiddleware(req, res, next) {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(403).json({ message: "Token missing" });
    }

    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        req.username = decodedInfo.username; // Request object me username attach kiya
        next(); // Agle step ya route handler par bhejo
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
}

// 4. PROTECTED ROUTE (Sirf wahi khulega jiska token valid hoga)
app.get("/me", authMiddleware, function(req, res) {
    res.json({
        username: req.username,
        message: "Aapka token sahi hai, entry allowed!"
    });
});

// ⚠️ JEST TESTS KE LIYE APP EXPORT KARNA ZAROORI HAI
module.exports = app; 

// Agar hum manually chalaayein toh hi port 3000 par listen karega
if (require.main === module) {
    app.listen(3000, () => console.log("Server running on port 3000"));
}

