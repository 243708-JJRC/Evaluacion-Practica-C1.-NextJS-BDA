import { Pool } from "pg";

export const pool = new Pool({
    host: "db",
    user: "web_user",
    password: "web_password",
    database: "postgres",
});
