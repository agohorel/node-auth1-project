const db = require("../data/dbConfig");

function find() {
  return db("users").select("username", "password", "id");
}

function findBy(filter) {
  return db("users")
    .select("username", "password", "id")
    .where(filter)
    .first();
}

async function insert(data) {
  const [id] = await db("users").insert(data);
  return findBy({ id });
}

module.exports = { find, findBy, insert };
