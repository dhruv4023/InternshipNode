-- Create Database
CREATE DATABASE SampleDatabase;

-- Use Database
USE SampleDatabase;

-- Create Table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL
);

-- Insert Data
INSERT INTO Users (FirstName, LastName, Email) VALUES
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com'),
('Bob', 'Johnson', 'bob.johnson@example.com');

-- Select Data
SELECT * FROM Users;

-- Update Data
UPDATE Users SET LastName = 'Smith' WHERE FirstName = 'John';

-- Delete Data
DELETE FROM Users WHERE FirstName = 'Bob';

-- Select with Condition
SELECT * FROM Users WHERE LastName = 'Smith';

-- Order By
SELECT * FROM Users ORDER BY FirstName ASC;

-- Count Rows
SELECT COUNT(*) FROM Users;

-- Group By
SELECT LastName, COUNT(*) FROM Users GROUP BY LastName;

-- Join Tables
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Product VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

INSERT INTO Orders (UserID, Product) VALUES
(1, 'Product A'),
(2, 'Product B'),
(1, 'Product C');

-- Inner Join
SELECT Users.FirstName, Users.LastName, Orders.Product
FROM Users
INNER JOIN Orders ON Users.UserID = Orders.UserID;

-- Left Join
SELECT Users.FirstName, Users.LastName, Orders.Product
FROM Users
LEFT JOIN Orders ON Users.UserID = Orders.UserID;

-- Right Join
SELECT Users.FirstName, Users.LastName, Orders.Product
FROM Users
RIGHT JOIN Orders ON Users.UserID = Orders.UserID;

-- Full Outer Join (MySQL doesn't support FULL OUTER JOIN directly)
SELECT Users.FirstName, Users.LastName, Orders.Product
FROM Users
LEFT JOIN Orders ON Users.UserID = Orders.UserID
UNION
SELECT Users.FirstName, Users.LastName, Orders.Product
FROM Users
RIGHT JOIN Orders ON Users.UserID = Orders.UserID;
