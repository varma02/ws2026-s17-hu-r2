import mysql from 'mysql2/promise'

export const db = await mysql.createConnection({
  host: process.env.MYSQL_HOST || 'db',
  user: process.env.MYSQL_USER || 'mariadb',
  password: process.env.MYSQL_PASS || 'mariadb',
  database: process.env.MYSQL_DB || 'mariadb'
});

export async function query<T = mysql.QueryResult>(sql: string, values?: any[]) {
  return (await db.query(sql, values))[0] as T;
}

db.connect();
process.once("beforeExit", () => db.destroy());