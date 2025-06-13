-- Library Management System

CREATE TABLE Member (
    MemberID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Address VARCHAR(200),
    MembershipDate DATE,
    Status VARCHAR(20)
);

CREATE TABLE Book (
    BookID INT PRIMARY KEY,
    Title VARCHAR(200) NOT NULL,
    Author VARCHAR(100),
    Publisher VARCHAR(100),
    ISBN VARCHAR(20),
    Genre VARCHAR(50),
    YearPublished INT,
    TotalCopies INT,
    AvailableCopies INT
);

CREATE TABLE Loan (
    LoanID INT PRIMARY KEY,
    MemberID INT,
    BookID INT,
    IssueDate DATE,
    DueDate DATE,
    ReturnDate DATE,
    Status VARCHAR(20),
    FOREIGN KEY (MemberID) REFERENCES Member(MemberID),
    FOREIGN KEY (BookID) REFERENCES Book(BookID)
);

CREATE TABLE Staff (
    StaffID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Role VARCHAR(30),
    Phone VARCHAR(20),
    HireDate DATE
);

CREATE TABLE Fine (
    FineID INT PRIMARY KEY,
    LoanID INT,
    Amount DECIMAL(8,2),
    DateIssued DATE,
    PaidStatus VARCHAR(10),
    FOREIGN KEY (LoanID) REFERENCES Loan(LoanID)
);

CREATE TABLE Reservation (
    ReservationID INT PRIMARY KEY,
    MemberID INT,
    BookID INT,
    ReservationDate DATE,
    Status VARCHAR(20),
    FOREIGN KEY (MemberID) REFERENCES Member(MemberID),
    FOREIGN KEY (BookID) REFERENCES Book(BookID)
);