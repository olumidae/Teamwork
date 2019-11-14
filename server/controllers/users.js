import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db/db';

dotenv.config();
const { secret } = process.env;
const expirationTime = '1024hrs';
const existingUser = 'SELECT * FROM Users WHERE email = $1';
const selectText = 'INSERT INTO Users (firstName, lastName, email, password, jobRole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';


const User = {
  async signupUser(req, res) {
    const {
 id, firstName, lastName, email, password, jobRole, department, address 
} = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const values = [firstName, lastName, email, hashPassword, jobRole, department, address];

    const { rows } = await pool.query(existingUser, [email]);

    if (rows[0] && rows[0].email === email) {
      return res.status(400).json({ status: 'error', error: 'User already exists' });
    }

    try {
      const { rows: rowsInsert } = await pool.query(selectText, values);
      const token = jwt.sign({ id, email }, secret, { expiresIn: expirationTime });
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          token,
          userId: rowsInsert[0].id,
        },
      });
    } catch (e) {
      return res.status(500).json({ status: 'error', error: 'Internal server error ' });
    }
  },

  async logInUser(req, res) {
    const { email, password } = req.body;
    const queryText = 'SELECT * FROM Users where email = $1';
    try {
      const { rows } = await pool.query(queryText, [email]);
      const comparePassword = bcrypt.compareSync(password, rows[0].password);
      if (!rows[0].email || !comparePassword) {
        return res.status(400).json({ status: 'error', error: 'Email/Password is incorrect' });
      }

      const updateText = 'UPDATE Users SET isLoggedIn = true WHERE email=$1 RETURNING *';
      const { rows: rowsUpdate } = await pool.query(updateText, [email]);
      const token = jwt.sign({ id: rows[0].id, email }, secret, { expiresIn: expirationTime });

      return res.status(200).json({
        status: 'success',
        data: {
          token,
          userId: rowsUpdate[0].id,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 'error', error: 'Internal server error ',
      });
    }
  },
};

export default User;
