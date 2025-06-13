-- Company Database

CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100) NOT NULL,
    Location VARCHAR(100)
);

CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Phone VARCHAR(20),
    HireDate DATE,
    JobTitle VARCHAR(50),
    DepartmentID INT,
    ManagerID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID),
    FOREIGN KEY (ManagerID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL,
    StartDate DATE,
    EndDate DATE,
    Budget DECIMAL(12,2),
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

CREATE TABLE Assignment (
    AssignmentID INT PRIMARY KEY,
    EmployeeID INT,
    ProjectID INT,
    Role VARCHAR(50),
    HoursWorked INT,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

CREATE TABLE Salary (
    SalaryID INT PRIMARY KEY,
    EmployeeID INT,
    Amount DECIMAL(10,2),
    EffectiveDate DATE,
    PayGrade VARCHAR(10),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Leave (
    LeaveID INT PRIMARY KEY,
    EmployeeID INT,
    StartDate DATE,
    EndDate DATE,
    LeaveType VARCHAR(30),
    Status VARCHAR(20),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);