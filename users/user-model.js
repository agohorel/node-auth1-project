const db = require("../data/dbConfig");

function find() {
  return db("users").select("username", "password", "id");
}

function findById(id) {
  return db("users")
    .select("username, password", "id")
    .where({ id })
    .first();
}

async function insert(data) {
  const [id] = await "users".insert(data);
  return findById(id);
}

module.exports = { find, findById, insert };
