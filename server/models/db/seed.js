import pool from './db';

const insertAdmin = `INSERT INTO Users (
    id, firstName, LastName, email, password, jobRole, department, address, isAdmin, isLoggedIn) VALUES
    ('1', 'Olumide', 'Omitiran', 'admin@gmail.com', '$2b$10$M7KDGr9g3tKfFWC0RpuXI.mZPlEkZarOSQTmhKIxh4GXVRb2OscrO', 'admin', 'IT', '23, Diagon Alley', 'true', 'true')`;

pool.query(insertAdmin);
