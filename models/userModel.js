const db = require('../config/db');

class User {
  static async findOne(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return rows[0];
  }

  static async create(userData) {
    const { email, password, name } = userData;
    await db.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, password, name]
    );
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async update(id, userData) {
    const { email, password, name } = userData;
    const [result] = await db.query(
      'UPDATE users SET email = ?, password = ?, name = ? WHERE id = ?',
      [email, password, name, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = User;
