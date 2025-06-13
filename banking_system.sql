-- Banking System

CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Address VARCHAR(200),
    DateOfBirth DATE,
    AccountStatus VARCHAR(20)
);

CREATE TABLE Account (
    AccountID INT PRIMARY KEY,
    CustomerID INT,
    AccountType VARCHAR(30),
    Balance DECIMAL(15,2),
    OpenDate DATE,
    Status VARCHAR(20),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE Transaction (
    TransactionID INT PRIMARY KEY,
    AccountID INT,
    TransactionType VARCHAR(20),
    Amount DECIMAL(15,2),
    TransactionDate DATE,
    Description VARCHAR(255),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

CREATE TABLE Loan (
    LoanID INT PRIMARY KEY,
    CustomerID INT,
    LoanType VARCHAR(20),
    Amount DECIMAL(15,2),
    InterestRate DECIMAL(5,2),
    StartDate DATE,
    EndDate DATE,
    Status VARCHAR(20),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE Branch (
    BranchID INT PRIMARY KEY,
    Name VARCHAR(100),
    Location VARCHAR(100),
    ManagerName VARCHAR(100),
    ContactNumber VARCHAR(20)
);

CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Role VARCHAR(30),
    BranchID INT,
    HireDate DATE,
    FOREIGN KEY (BranchID) REFERENCES Branch(BranchID)
);

CREATE TABLE Card (
    CardID INT PRIMARY KEY,
    AccountID INT,
    CardNumber VARCHAR(30),
    CardType VARCHAR(10),
    IssueDate DATE,
    ExpiryDate DATE,
    Status VARCHAR(20),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);