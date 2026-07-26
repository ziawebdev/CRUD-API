const express = require("express");
const supabase = require("../supabase");

const router = express.Router();

router.post("/signup", async (req, res) => {

    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error(error);

        return res.status(400).json({
            error: error.message,
            details: error,
        });
    }

    return res.status(201).json(data);

});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return res.status(401).json({
            error: error.message,
        });
    }

    res.json({
        message: "Login successful",
        session: data.session,
        user: data.user,
    });

});

router.post("/logout",  (req, res) => {
    res.json({
        message: "Logout successful. Please discard the access token on the client."
    });
});

module.exports = router;