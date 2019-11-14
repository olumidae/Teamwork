import pool from './db';

const insertAdmin = `INSERT INTO Users (
    id, firstName, LastName, email, password, jobRole, department, address, isAdmin, isLoggedIn) VALUES
    ('1', 'Olumide', 'Omitiran', 'admin@gmail.com', '$2b$10$M7KDGr9g3tKfFWC0RpuXI.mZPlEkZarOSQTmhKIxh4GXVRb2OscrO', 'admin', 'IT', '23, Diagon Alley', 'true', 'true'),
    ('2', 'Test', 'User', 'testuser@gmail.com', '$2b$10$M7KDGr9g3tKfFWC0RpuXI.mZPlEkZarOSQTmhKIxh4GXVRb2OscrO', 'Accountant', 'Accounting', '23, Bourdillion Drive', 'false', 'false');
    INSERT INTO Gifs (id, title, imageurl, imagecloudid, createdby) VALUES
    ('1', 'snoop', 'http://res.cloudinary.com/olumidae/image/upload/v1573430301/dlhcsmg6tbfyhpstijwy.gif', 'dlhcsmg6tbfyhpstijwy', '2');`;

pool.query(insertAdmin);
