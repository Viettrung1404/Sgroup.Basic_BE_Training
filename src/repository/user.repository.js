import pool from "../config/db.config.js";

export const findAll = async ({sortBy = "id", order = "asc"}) => {
  const validSortColumns = ["id", "name", "email", "age"];
  if (!validSortColumns.includes(sortBy)) {
    throw new Error(`Invalid sort column: ${sortBy}`);
  }

  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order.toLowerCase())) {
    throw new Error(`Invalid order: ${order}`);
  }

  const result = await pool.query(`SELECT * FROM users ORDER BY ${sortBy} ${order}`);
  return result.rows;
}
export const findById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
};

export const create = async ({ name, email, age }) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
    [name, email, age]
  );
  return result.rows[0];
};

export const update = async (id, { name, email, age }) => {
  const result = await pool.query(
    `UPDATE users 
     SET name = COALESCE($1, name), 
         email = COALESCE($2, email), 
         age = COALESCE($3, age) 
     WHERE id = $4 
     RETURNING *`,
    [name ?? null, email ?? null, age ?? null, id]
  );
  return result.rows[0] || null;
};

export const deleteById = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] || null;
};
