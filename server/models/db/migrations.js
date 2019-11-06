import pool from './db';


const createTable = `DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE Users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    jobRole VARCHAR(128) NOT NULL,
    department VARCHAR(128) NOT NULL,
    address VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    isLoggedIn BOOLEAN NOT NULL DEFAULT false
);
    DROP TABLE IF EXISTS Gifs CASCADE;
    CREATE TABLE Gifs (
        id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(128) NOT NULL,
        imageURL VARCHAR NOT NULL,
        imageCloudId VARCHAR(255) NOT NULL,
        createdBy SERIAL NOT NULL REFERENCES Users (id),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    DROP TABLE IF EXISTS Articles CASCADE;
    CREATE TABLE Articles (
        id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(128) NOT NULL,
        article VARCHAR NOT NULL,
        category VARCHAR(50) NOT NULL,
        createdBy SERIAL NOT NULL REFERENCES Users (id),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    DROP TABLE IF EXISTS ArticleComments CASCADE;
    CREATE TABLE ArticleComments (
        id SERIAL PRIMARY KEY NOT NULL,
        articleId SERIAL NOT NULL REFERENCES Articles (id),
        articleComment VARCHAR(400) NOT NULL,
        createdBy SERIAL NOT NULL REFERENCES Users (id),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
    );
    DROP TABLE IF EXISTS GifComments CASCADE;
    CREATE TABLE GifComments (
        id SERIAL PRIMARY KEY NOT NULL,
        gifId SERIAL NOT NULL REFERENCES Gifs (id),
        gifComment VARCHAR(400) NOT NULL,
        createdBy SERIAL NOT NULL REFERENCES Users (id),
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )

`;

pool.query(createTable).catch((err) => console.log(err.message));
