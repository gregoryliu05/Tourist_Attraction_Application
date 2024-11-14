drop table users;
drop table rating;
drop table user_comments;
drop table picture;
drop table time_of_booking;
drop table booking_details;
drop table categorizes;
drop table category;
drop table locations;
drop table parks;
drop table museums;
drop table bookable;
drop table restaurant;
drop table hotel;
drop table event_time;
drop table event_details;
drop table city_details;
drop table city_time_zone;



CREATE TABLE users (
    userID CHAR(10) NOT NULL,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    numReviews INT,
    email VARCHAR(50) UNIQUE,
    PRIMARY KEY(userID)
);
GRANT SELECT ON users TO PUBLIC;

CREATE TABLE category (
    name VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255)
);
GRANT SELECT ON category TO PUBLIC;

CREATE TABLE city_details (
    provinceState VARCHAR(2) NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (provinceState, name)
);
GRANT SELECT ON city_details TO PUBLIC;

CREATE TABLE city_time_zone (
    provinceState VARCHAR(2) NOT NULL,
    country VARCHAR(50) NOT NULL,
    timeZone VARCHAR(50),
    PRIMARY KEY (provinceState, country)
);
GRANT SELECT ON city_time_zone TO PUBLIC;


CREATE TABLE locations (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    operationHours VARCHAR(50),
    provinceState VARCHAR(2) NOT NULL,
    city_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (postalCode, address),
    FOREIGN KEY (provinceState, city_name) REFERENCES city_details(provinceState, name)
);
GRANT SELECT ON locations TO PUBLIC;

CREATE TABLE rating (
    ratingID CHAR(10) PRIMARY KEY,
    score FLOAT,
    userID CHAR(10),
    postalCode VARCHAR(10) NOT NULL,
    address VARCHAR(50) NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address)
);
GRANT SELECT ON rating TO PUBLIC;

CREATE TABLE user_comments (
    ratingID CHAR(10),
    text VARCHAR(255),
    FOREIGN KEY (ratingID) REFERENCES rating(ratingID)
);
GRANT SELECT ON user_comments TO PUBLIC;

CREATE TABLE picture (
    ratingID CHAR(10),
    image BLOB, 
    FOREIGN KEY (ratingID) REFERENCES rating(ratingID)
);
GRANT SELECT ON picture TO PUBLIC;


CREATE TABLE time_of_booking (
    startTime VARCHAR(50),
    endTime VARCHAR(50),
    duration VARCHAR(50),
    PRIMARY KEY (startTime, duration)
);
GRANT SELECT ON time_of_booking TO PUBLIC;

CREATE TABLE bookable (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    price FLOAT,
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address)
);
GRANT SELECT ON bookable TO PUBLIC;

CREATE TABLE booking_details (
    bookingID CHAR(10) PRIMARY KEY,
    startTime VARCHAR(50),
    duration VARCHAR(50),
    numPeople INT,
    userID CHAR(10),
    postalCode VARCHAR(10) NOT NULL,
    address VARCHAR(50) NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (postalCode, address) REFERENCES bookable(postalCode, address)
);
GRANT SELECT ON booking_details TO PUBLIC;

CREATE TABLE categorizes (
    name VARCHAR(50),
    postalCode VARCHAR(10),
    address VARCHAR(50),
    PRIMARY KEY (name, postalCode, address),
    FOREIGN KEY (name) REFERENCES category(name),
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address)
);
GRANT SELECT ON categorizes TO PUBLIC;

CREATE TABLE parks (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    area INT,
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address)
);
GRANT SELECT ON parks TO PUBLIC;

CREATE TABLE museums (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    cost FLOAT,
    type VARCHAR(50),
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address)
);
GRANT SELECT ON museums TO PUBLIC;

CREATE TABLE restaurant (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    cuisineType VARCHAR(50),
    FOREIGN KEY (postalCode, address) REFERENCES bookable(postalCode, address)
);
GRANT SELECT ON restaurant TO PUBLIC;

CREATE TABLE hotel (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    price FLOAT,
    stars INT,
    FOREIGN KEY (postalCode, address) REFERENCES bookable(postalCode, address)
);
GRANT SELECT ON hotel TO PUBLIC;

CREATE TABLE event_time (
    startTime VARCHAR(50),
    end_time VARCHAR(50),
    duration VARCHAR(50),
    PRIMARY KEY (startTime, duration)
);
GRANT SELECT ON event_time TO PUBLIC;

CREATE TABLE event_details (
    name VARCHAR(50),
    startTime VARCHAR(50),
    duration VARCHAR(50),
    host VARCHAR(50),
    postalCode VARCHAR(10),
    address VARCHAR(50),
    PRIMARY KEY (name, startTime, duration),
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address)
);
GRANT SELECT ON event_details TO PUBLIC;



-- users table
INSERT INTO users VALUES (1248484739, 'Greg', 'JumpingMan', 'aKask3*k', 4, 'GregDuck@gmail.com');
INSERT INTO users VALUES ('1000000001', 'Alice Johnson', 'alicej', 'password123', 5, 'alice@example.com');
INSERT INTO users VALUES ('1000000002', 'Bob Smith', 'bobs', 'password456', 3, 'bob@example.com');
INSERT INTO users VALUES ('1000000003', 'Charlie Brown', 'charlieb', 'securepass', 2, 'charlie@example.com');
INSERT INTO users VALUES ('1000000004', 'Diana Prince', 'dianap', 'wonderpass', 7, 'diana@example.com');
INSERT INTO users VALUES ('1000000005', 'Edward Kim', 'edwardk', 'edpass123', 6, 'edward@example.com');
INSERT INTO users VALUES ('1000000006', 'Fiona Chen', 'fionac', 'fi0naPass', 1, 'fiona@example.com');
INSERT INTO users VALUES ('1000000007', 'George Lee', 'georgel', 'ge0rg3L33', 4, 'george@example.com');
INSERT INTO users VALUES ('1000000008', 'Hannah Moore', 'hannahm', 'password789', 5, 'hannah@example.com');
INSERT INTO users VALUES ('1000000009', 'Ian Davis', 'iand', 'ianPassword', 3, 'ian@example.com');
INSERT INTO users VALUES ('1000000010', 'Julia Roberts', 'juliar', 'jPass456', 8, 'julia@example.com');

-- category table
INSERT INTO category VALUES ('Park', 'Outdoor recreational areas.');
INSERT INTO category VALUES ('Museum', 'Indoor areas with historical exhibits.');
INSERT INTO category VALUES ('Restaurant', 'Dining establishments.');
INSERT INTO category VALUES ('Hotel', 'Accommodations for travelers.');
INSERT INTO category VALUES ('Library', 'Public spaces with books.');
INSERT INTO category VALUES ('Gym', 'Places for physical fitness.');
INSERT INTO category VALUES ('Aquarium', 'Displays of aquatic life.');
INSERT INTO category VALUES ('Zoo', 'Enclosures for wildlife.');
INSERT INTO category VALUES ('Art Gallery', 'Display spaces for artwork.');
INSERT INTO category VALUES ('Beach', 'Outdoor area by the sea or lake.');

-- city_details table
INSERT INTO city_details VALUES ('BC', 'Vancouver');
INSERT INTO city_details VALUES ('BC', 'Victoria');
INSERT INTO city_details VALUES ('ON', 'Toronto');
INSERT INTO city_details VALUES ('ON', 'Ottawa');
INSERT INTO city_details VALUES ('QC', 'Montreal');
INSERT INTO city_details VALUES ('QC', 'Quebec City');
INSERT INTO city_details VALUES ('AB', 'Calgary');
INSERT INTO city_details VALUES ('AB', 'Edmonton');
INSERT INTO city_details VALUES ('MB', 'Winnipeg');
INSERT INTO city_details VALUES ('NS', 'Halifax');

-- city_time_zone table
INSERT INTO city_time_zone VALUES ('BC', 'Canada', 'PST');
INSERT INTO city_time_zone VALUES ('ON', 'Canada', 'EST');
INSERT INTO city_time_zone VALUES ('QC', 'Canada', 'EST');
INSERT INTO city_time_zone VALUES ('AB', 'Canada', 'MST');
INSERT INTO city_time_zone VALUES ('MB', 'Canada', 'CST');
INSERT INTO city_time_zone VALUES ('NS', 'Canada', 'AST');
INSERT INTO city_time_zone VALUES ('NB', 'Canada', 'AST');
INSERT INTO city_time_zone VALUES ('NL', 'Canada', 'NST');
INSERT INTO city_time_zone VALUES ('YT', 'Canada', 'PST');
INSERT INTO city_time_zone VALUES ('NT', 'Canada', 'MST');

-- locations table
INSERT INTO locations VALUES ('V5K1Z1', '123 Elm Street', '9AM-5PM', 'BC');
INSERT INTO locations VALUES ('V5K2Z2', '456 Oak Avenue', '10AM-6PM', 'BC');
INSERT INTO locations VALUES ('V5K3Z3', '789 Maple Lane', '8AM-8PM', 'BC');
INSERT INTO locations VALUES ('V5K4Z4', '135 Pine Street', '7AM-9PM', 'BC');
INSERT INTO locations VALUES ('V5K5Z5', '246 Cedar Road', '24 hours', 'BC');
INSERT INTO locations VALUES ('V5K6Z6', '357 Birch Way', '6AM-10PM', 'BC');
INSERT INTO locations VALUES ('V5K7Z7', '468 Willow Drive', '8AM-6PM', 'BC');
INSERT INTO locations VALUES ('V5K8Z8', '579 Fir Trail', '10AM-5PM', 'BC');
INSERT INTO locations VALUES ('V5K9Z9', '680 Redwood Road', '9AM-6PM', 'BC');
INSERT INTO locations VALUES ('V5K0Z0', '791 Ash Boulevard', '24 hours', 'BC');

-- rating table
INSERT INTO rating VALUES ('R000000001', 4.5, '1000000001', 'V5K1Z1', '123 Elm Street');
INSERT INTO rating VALUES ('R000000002', 3.7, '1000000002', 'V5K2Z2', '456 Oak Avenue');
INSERT INTO rating VALUES ('R000000003', 5.0, '1000000003', 'V5K3Z3', '789 Maple Lane');
INSERT INTO rating VALUES ('R000000004', 2.8, '1000000004', 'V5K4Z4', '135 Pine Street');
INSERT INTO rating VALUES ('R000000005', 3.3, '1000000005', 'V5K5Z5', '246 Cedar Road');
INSERT INTO rating VALUES ('R000000006', 4.9, '1000000006', 'V5K6Z6', '357 Birch Way');
INSERT INTO rating VALUES ('R000000007', 3.1, '1000000007', 'V5K7Z7', '468 Willow Drive');
INSERT INTO rating VALUES ('R000000008', 4.2, '1000000008', 'V5K8Z8', '579 Fir Trail');
INSERT INTO rating VALUES ('R000000009', 5.0, '1000000009', 'V5K9Z9', '680 Redwood Road');
INSERT INTO rating VALUES ('R000000010', 4.0, '1000000010', 'V5K0Z0', '791 Ash Boulevard');

-- user_comments table
INSERT INTO user_comments VALUES ('R000000001', 'Great place, highly recommend!');
INSERT INTO user_comments VALUES ('R000000002', 'Decent, but could be better.');
INSERT INTO user_comments VALUES ('R000000003', 'Absolutely fantastic!');
INSERT INTO user_comments VALUES ('R000000004', 'Not very satisfied with the experience.');
INSERT INTO user_comments VALUES ('R000000005', 'Would visit again.');
INSERT INTO user_comments VALUES ('R000000006', 'Very clean and well-maintained.');
INSERT INTO user_comments VALUES ('R000000007', 'Average place, nothing special.');
INSERT INTO user_comments VALUES ('R000000008', 'Enjoyed my visit thoroughly.');
INSERT INTO user_comments VALUES ('R000000009', 'Best experience ever!');
INSERT INTO user_comments VALUES ('R000000010', 'Friendly staff and great atmosphere.');

-- picture table
INSERT INTO picture VALUES ('R000000001', '0x89504E47');
INSERT INTO picture VALUES ('R000000002', '0xFFD8FFE0');
INSERT INTO picture VALUES ('R000000003', '0x89504E47');
INSERT INTO picture VALUES ('R000000004', '0xFFD8FFE0');
INSERT INTO picture VALUES ('R000000005', '0x89504E47');
INSERT INTO picture VALUES ('R000000006', '0xFFD8FFE0');
INSERT INTO picture VALUES ('R000000007', '0x89504E47');
INSERT INTO picture VALUES ('R000000008', '0xFFD8FFE0');
INSERT INTO picture VALUES ('R000000009', '0x89504E47');
INSERT INTO picture VALUES ('R000000010', '0xFFD8FFE0');

-- time_of_booking table
INSERT INTO time_of_booking VALUES ('08:00 AM', '10:00 AM', '2 hours');
INSERT INTO time_of_booking VALUES ('10:00 AM', '11:30 AM', '1.5 hours');
INSERT INTO time_of_booking VALUES ('12:00 PM', '01:30 PM', '1.5 hours');
INSERT INTO time_of_booking VALUES ('02:00 PM', '03:30 PM', '1.5 hours');
INSERT INTO time_of_booking VALUES ('03:30 PM', '04:30 PM', '1 hour');
INSERT INTO time_of_booking VALUES ('05:00 PM', '06:30 PM', '1.5 hours');
INSERT INTO time_of_booking VALUES ('07:00 PM', '08:00 PM', '1 hour');
INSERT INTO time_of_booking VALUES ('08:30 PM', '09:30 PM', '1 hour');
INSERT INTO time_of_booking VALUES ('09:30 PM', '11:00 PM', '1.5 hours');
INSERT INTO time_of_booking VALUES ('11:00 PM', '12:00 AM', '1 hour');

-- bookable table
INSERT INTO bookable VALUES ('V5K1Z1', '123 Elm Street', 100.00);
INSERT INTO bookable VALUES ('V5K2Z2', '456 Oak Avenue', 150.00);
INSERT INTO bookable VALUES ('V5K3Z3', '789 Maple Lane', 75.00);
INSERT INTO bookable VALUES ('V5K4Z4', '135 Pine Street', 200.00);
INSERT INTO bookable VALUES ('V5K5Z5', '246 Cedar Road', 125.00);
INSERT INTO bookable VALUES ('V5K6Z6', '357 Birch Way', 175.00);
INSERT INTO bookable VALUES ('V5K7Z7', '468 Willow Drive', 80.00);
INSERT INTO bookable VALUES ('V5K8Z8', '579 Fir Trail', 140.00);
INSERT INTO bookable VALUES ('V5K9Z9', '680 Redwood Road', 95.00);
INSERT INTO bookable VALUES ('V5K0Z0', '791 Ash Boulevard', 130.00);

-- booking_details table
INSERT INTO booking_details VALUES ('B000000001', '08:00 AM', '2 hours', 4, '1000000001', 'V5K1Z1', '123 Elm Street');
INSERT INTO booking_details VALUES ('B000000002', '10:00 AM', '1.5 hours', 2, '1000000002', 'V5K2Z2', '456 Oak Avenue');
INSERT INTO booking_details VALUES ('B000000003', '12:00 PM', '1.5 hours', 5, '1000000003', 'V5K3Z3', '789 Maple Lane');
INSERT INTO booking_details VALUES ('B000000004', '02:00 PM', '1.5 hours', 3, '1000000004', 'V5K4Z4', '135 Pine Street');
INSERT INTO booking_details VALUES ('B000000005', '03:30 PM', '1 hour', 6, '1000000005', 'V5K5Z5', '246 Cedar Road');
INSERT INTO booking_details VALUES ('B000000006', '05:00 PM', '1.5 hours', 8, '1000000006', 'V5K6Z6', '357 Birch Way');
INSERT INTO booking_details VALUES ('B000000007', '07:00 PM', '1 hour', 4, '1000000007', 'V5K7Z7', '468 Willow Drive');
INSERT INTO booking_details VALUES ('B000000008', '08:30 PM', '1 hour', 7, '1000000008', 'V5K8Z8', '579 Fir Trail');
INSERT INTO booking_details VALUES ('B000000009', '09:30 PM', '1.5 hours', 5, '1000000009', 'V5K9Z9', '680 Redwood Road');
INSERT INTO booking_details VALUES ('B000000010', '11:00 PM', '1 hour', 9, '1000000010', 'V5K0Z0', '791 Ash Boulevard');

-- categorizes table
INSERT INTO categorizes VALUES ('Park', 'V5K1Z1', '123 Elm Street');
INSERT INTO categorizes VALUES ('Museum', 'V5K2Z2', '456 Oak Avenue');
INSERT INTO categorizes VALUES ('Restaurant', 'V5K3Z3', '789 Maple Lane');
INSERT INTO categorizes VALUES ('Hotel', 'V5K4Z4', '135 Pine Street');
INSERT INTO categorizes VALUES ('Park', 'V5K5Z5', '246 Cedar Road');
INSERT INTO categorizes VALUES ('Museum', 'V5K6Z6', '357 Birch Way');
INSERT INTO categorizes VALUES ('Restaurant', 'V5K7Z7', '468 Willow Drive');
INSERT INTO categorizes VALUES ('Hotel', 'V5K8Z8', '579 Fir Trail');
INSERT INTO categorizes VALUES ('Park', 'V5K9Z9', '680 Redwood Road');
INSERT INTO categorizes VALUES ('Museum', 'V5K0Z0', '791 Ash Boulevard');

-- parks table
INSERT INTO parks VALUES ('V5K1Z1', '123 Elm Street', 500);
INSERT INTO parks VALUES ('V5K2Z2', '456 Oak Avenue', 750);
INSERT INTO parks VALUES ('V5K3Z3', '789 Maple Lane', 300);
INSERT INTO parks VALUES ('V5K4Z4', '135 Pine Street', 1200);
INSERT INTO parks VALUES ('V5K5Z5', '246 Cedar Road', 950);
INSERT INTO parks VALUES ('V5K6Z6', '357 Birch Way', 400);
INSERT INTO parks VALUES ('V5K7Z7', '468 Willow Drive', 550);
INSERT INTO parks VALUES ('V5K8Z8', '579 Fir Trail', 700);
INSERT INTO parks VALUES ('V5K9Z9', '680 Redwood Road', 1100);
INSERT INTO parks VALUES ('V5K0Z0', '791 Ash Boulevard', 850);

-- museums table
INSERT INTO museums VALUES ('V5K1Z1', '123 Elm Street', 15.00, 'History');
INSERT INTO museums VALUES ('V5K2Z2', '456 Oak Avenue', 20.00, 'Science');
INSERT INTO museums VALUES ('V5K3Z3', '789 Maple Lane', 10.00, 'Art');
INSERT INTO museums VALUES ('V5K4Z4', '135 Pine Street', 25.00, 'Technology');
INSERT INTO museums VALUES ('V5K5Z5', '246 Cedar Road', 12.50, 'Natural History');
INSERT INTO museums VALUES ('V5K6Z6', '357 Birch Way', 18.00, 'Aquatic Life');
INSERT INTO museums VALUES ('V5K7Z7', '468 Willow Drive', 22.00, 'Cultural Heritage');
INSERT INTO museums VALUES ('V5K8Z8', '579 Fir Trail', 9.50, 'Space Exploration');
INSERT INTO museums VALUES ('V5K9Z9', '680 Redwood Road', 16.00, 'Archaeology');
INSERT INTO museums VALUES ('V5K0Z0', '791 Ash Boulevard', 13.75, 'Modern Art');

-- restaurant table
INSERT INTO restaurant VALUES ('V5K1Z1', '123 Elm Street', 'Italian');
INSERT INTO restaurant VALUES ('V5K2Z2', '456 Oak Avenue', 'Mexican');
INSERT INTO restaurant VALUES ('V5K3Z3', '789 Maple Lane', 'Chinese');
INSERT INTO restaurant VALUES ('V5K4Z4', '135 Pine Street', 'Indian');
INSERT INTO restaurant VALUES ('V5K5Z5', '246 Cedar Road', 'Japanese');
INSERT INTO restaurant VALUES ('V5K6Z6', '357 Birch Way', 'French');
INSERT INTO restaurant VALUES ('V5K7Z7', '468 Willow Drive', 'Thai');
INSERT INTO restaurant VALUES ('V5K8Z8', '579 Fir Trail', 'Korean');
INSERT INTO restaurant VALUES ('V5K9Z9', '680 Redwood Road', 'Vietnamese');
INSERT INTO restaurant VALUES ('V5K0Z0', '791 Ash Boulevard', 'Greek');

-- hotel table
INSERT INTO hotel VALUES ('V5K1Z1', '123 Elm Street', 250.00, 4);
INSERT INTO hotel VALUES ('V5K2Z2', '456 Oak Avenue', 180.00, 3);
INSERT INTO hotel VALUES ('V5K3Z3', '789 Maple Lane', 300.00, 5);
INSERT INTO hotel VALUES ('V5K4Z4', '135 Pine Street', 220.00, 4);
INSERT INTO hotel VALUES ('V5K5Z5', '246 Cedar Road', 150.00, 3);
INSERT INTO hotel VALUES ('V5K6Z6', '357 Birch Way', 275.00, 4);
INSERT INTO hotel VALUES ('V5K7Z7', '468 Willow Drive', 125.00, 2);
INSERT INTO hotel VALUES ('V5K8Z8', '579 Fir Trail', 350.00, 5);
INSERT INTO hotel VALUES ('V5K9Z9', '680 Redwood Road', 200.00, 3);
INSERT INTO hotel VALUES ('V5K0Z0', '791 Ash Boulevard', 175.00, 3);

-- event_time table
INSERT INTO event_time VALUES ('09:00 AM', '11:00 AM', '2 hours');
INSERT INTO event_time VALUES ('11:00 AM', '12:30 PM', '1.5 hours');
INSERT INTO event_time VALUES ('01:00 PM', '03:00 PM', '2 hours');
INSERT INTO event_time VALUES ('03:00 PM', '04:00 PM', '1 hour');
INSERT INTO event_time VALUES ('05:00 PM', '06:30 PM', '1.5 hours');
INSERT INTO event_time VALUES ('07:00 PM', '09:00 PM', '2 hours');
INSERT INTO event_time VALUES ('10:00 AM', '12:00 PM', '2 hours');
INSERT INTO event_time VALUES ('12:30 PM', '02:00 PM', '1.5 hours');
INSERT INTO event_time VALUES ('02:00 PM', '04:00 PM', '2 hours');
INSERT INTO event_time VALUES ('06:30 PM', '08:30 PM', '2 hours');

-- event_details table
INSERT INTO event_details VALUES ('Music Concert', '09:00 AM', '2 hours', 'City Events', 'V5K1Z1', '123 Elm Street');
INSERT INTO event_details VALUES ('Art Exhibition', '11:00 AM', '1.5 hours', 'Art Center', 'V5K2Z2', '456 Oak Avenue');
INSERT INTO event_details VALUES ('Food Festival', '01:00 PM', '2 hours', 'Food Lovers', 'V5K3Z3', '789 Maple Lane');
INSERT INTO event_details VALUES ('Book Reading', '03:00 PM', '1 hour', 'Local Library', 'V5K4Z4', '135 Pine Street');
INSERT INTO event_details VALUES ('Outdoor Movie', '05:00 PM', '1.5 hours', 'City Council', 'V5K5Z5', '246 Cedar Road');
INSERT INTO event_details VALUES ('Yoga Class', '07:00 PM', '2 hours', 'Wellness Club', 'V5K6Z6', '357 Birch Way');
INSERT INTO event_details VALUES ('Cooking Workshop', '10:00 AM', '2 hours', 'Chef School', 'V5K7Z7', '468 Willow Drive');
INSERT INTO event_details VALUES ('Tech Meetup', '12:30 PM', '1.5 hours', 'Tech Community', 'V5K8Z8', '579 Fir Trail');
INSERT INTO event_details VALUES ('Charity Run', '02:00 PM', '2 hours', 'Local Sports', 'V5K9Z9', '680 Redwood Road');
INSERT INTO event_details VALUES ('Dance Class', '06:30 PM', '2 hours', 'Dance Academy', 'V5K0Z0', '791 Ash Boulevard');





