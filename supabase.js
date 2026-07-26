const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY_EXISTS:", !!process.env.SUPABASE_ANON_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

module.exports = supabase;