-- Movie Ticket Booking System

CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100)
);

CREATE TABLE Movie (
    MovieID INT PRIMARY KEY,
    Title VARCHAR(100),
    Genre VARCHAR(30),
    Duration INT
);

CREATE TABLE Theater (
    TheaterID INT PRIMARY KEY,
    Name VARCHAR(100),
    Location VARCHAR(100)
);

CREATE TABLE Showtime (
    ShowtimeID INT PRIMARY KEY,
    MovieID INT,
    TheaterID INT,
    DateTime DATETIME,
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
    FOREIGN KEY (TheaterID) REFERENCES Theater(TheaterID)
);

CREATE TABLE Booking (
    BookingID INT PRIMARY KEY,
    UserID INT,
    ShowtimeID INT,
    Seats INT,
    Price DECIMAL(10,2),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (ShowtimeID) REFERENCES Showtime(ShowtimeID)
);