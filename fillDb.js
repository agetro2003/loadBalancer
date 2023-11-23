const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "loadbalancer",
  port: "5432",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});
async function insertData(data, tableName) {
  const query = `INSERT INTO ${tableName} (cod, descrip) VALUES ( $1, $2);`;
  await pool.query(query, data);
}
async function insertMany(tableName, n, descrip) {
  for (let i = 0; i < n; i++) {
    try {
      await insertData([i, descrip], tableName);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(`done ${tableName}`);
}

insertMany("tab1", 10, "descrip");
insertMany(
  "tab2",
  40,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
);
insertMany(
  "tab3",
  100,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
);
