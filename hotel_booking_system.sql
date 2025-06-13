-- Hotel Booking System

CREATE TABLE Guest (
    GuestID INT PRIMARY KEY,
    Name VARCHAR(100),
    ContactInfo VARCHAR(200)
);

CREATE TABLE Room (
    RoomID INT PRIMARY KEY,
    RoomType VARCHAR(50),
    Price DECIMAL(10,2),
    Status VARCHAR(20)
);

CREATE TABLE Reservation (
    ReservationID INT PRIMARY KEY,
    GuestID INT,
    RoomID INT,
    CheckInDate DATE,
    CheckOutDate DATE,
    FOREIGN KEY (GuestID) REFERENCES Guest(GuestID),
    FOREIGN KEY (RoomID) REFERENCES Room(RoomID)
);

CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY,
    ReservationID INT,
    Amount DECIMAL(10,2),
    Date DATE,
    PaymentMethod VARCHAR(20),
    FOREIGN KEY (ReservationID) REFERENCES Reservation(ReservationID)
);