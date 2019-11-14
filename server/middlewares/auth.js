import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import validateUser from '../helpers/userHelper';
import pool from '../models/db/db';

dotenv.config();
const { secret } = process.env;
// const expirationTime = '10h';


async function queryUser(decoded) {
  const queryText = 'SELECT * FROM users WHERE id=$1';
  const { rows } = await pool.query(queryText, [decoded.id]);
  return rows;
}

// eslint-disable-next-line import/prefer-default-export
export const tokenValidator = {
  async validateUserToken(req, res, next) {
    const { token } = req.headers;
    if (token) {
      jwt.verify(token, secret, async (err, decoded) => {
        if (err) return res.status(401).json({
          status: 'error',
          error: 'Failed to authenticate token',
        });
        const rows = await queryUser(decoded);
        if (rows[0]) {
          req.user = rows[0];
          req.decoded = decoded;
          return next();
        }
        return res.status(401).json({
          status: 'error',
          error: 'Not a valid user',
        });
      });
    } else {
      return res.status(400).json({
        status: 'error', error: 'Token not provided',
      });
    }
  },

  async validateAdminToken(req, res, next) {
    const { token } = req.headers;

    if (token) {
      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'error',
            error: 'Failed to authenticate token',
          });
        }
        const rows = await queryUser(decoded);

        if (rows[0] && rows[0].isadmin) {
          req.user = rows[0];
          req.decoded = decoded;
          return next();
        }
        return res.status(403).json({
          status: 'error',
          error: 'Not an admin user',
        });
      });
    } else {
      return res.status(400).json({
        status: 'error',
        error: 'token not provided',
      });
    }
  },

};

export const signupValidator = (req, res, next) => {
  const { error } = validateUser.signupValidator(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      error: error.details[0].message,
    });
  }
  return next();
};

export const loginValidator = (req, res, next) => {
  const { error } = validateUser.loginValidator(req.body);
  if (error) return res.status(400).json({
    status: 'error',
    error: error.details[0].message,
  });
  return next();
};
