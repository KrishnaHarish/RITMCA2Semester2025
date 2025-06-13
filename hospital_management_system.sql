-- Hospital Management System

CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(100),
    Location VARCHAR(100)
);

CREATE TABLE Patient (
    PatientID INT PRIMARY KEY,
    Name VARCHAR(100),
    DOB DATE,
    Address VARCHAR(200),
    Phone VARCHAR(20)
);

CREATE TABLE Doctor (
    DoctorID INT PRIMARY KEY,
    Name VARCHAR(100),
    Specialty VARCHAR(100),
    Phone VARCHAR(20),
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Appointment (
    AppointmentID INT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    Date DATE,
    Time TIME,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);

CREATE TABLE Prescription (
    PrescriptionID INT PRIMARY KEY,
    AppointmentID INT,
    Medication VARCHAR(100),
    Dosage VARCHAR(50),
    FOREIGN KEY (AppointmentID) REFERENCES Appointment(AppointmentID)
);