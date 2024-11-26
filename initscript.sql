drop table users CASCADE CONSTRAINTS; 
drop table category CASCADE CONSTRAINTS;
drop table city_details CASCADE CONSTRAINTS;
drop table city_time_zone CASCADE CONSTRAINTS;
drop table locations CASCADE CONSTRAINTS;
drop table rating CASCADE CONSTRAINTS;
drop table user_comments CASCADE CONSTRAINTS;
drop table picture CASCADE CONSTRAINTS;
drop table time_of_booking CASCADE CONSTRAINTS;
drop table bookable CASCADE CONSTRAINTS;
drop table booking_details CASCADE CONSTRAINTS;
drop table categorizes CASCADE CONSTRAINTS;
drop table parks CASCADE CONSTRAINTS;
drop table museums CASCADE CONSTRAINTS;
drop table restaurant CASCADE CONSTRAINTS;
drop table hotel CASCADE CONSTRAINTS;
drop table event_time CASCADE CONSTRAINTS;
drop table event_details CASCADE CONSTRAINTS;



CREATE TABLE users (
    userID CHAR(10) NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    numReviews INT,
    email VARCHAR(50) UNIQUE,
    PRIMARY KEY(userID)
);
GRANT SELECT ON users TO PUBLIC;

-- TODO-- 
CREATE TABLE category (
    catName VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255)
);
GRANT SELECT ON category TO PUBLIC;

-- TODO-- 
CREATE TABLE city_details (
    provinceState VARCHAR(2) NOT NULL,
    cityName VARCHAR(50) NOT NULL,
    PRIMARY KEY (provinceState, cityName)
);
GRANT SELECT ON city_details TO PUBLIC;

-- TODO-- 
CREATE TABLE city_time_zone (
    provinceState VARCHAR(2) NOT NULL,
    country VARCHAR(50) NOT NULL,
    timeZone VARCHAR(50),
    PRIMARY KEY (provinceState, country)
);
GRANT SELECT ON city_time_zone TO PUBLIC;


CREATE TABLE locations (
    locationID VARCHAR(10) UNIQUE,
    locationName VARCHAR(50),
    postalCode VARCHAR(10),
    address VARCHAR(50),
    operationHours VARCHAR(50),
    provinceState VARCHAR(2) NOT NULL,
    cityName VARCHAR(50) NOT NULL,
    PRIMARY KEY (postalCode, address),
    FOREIGN KEY (provinceState, cityName) REFERENCES city_details(provinceState, cityName) ON DELETE CASCADE
);
GRANT SELECT ON locations TO PUBLIC;

CREATE TABLE rating (
    ratingID CHAR(10) PRIMARY KEY,
    score FLOAT,
    userID CHAR(10),
    postalCode VARCHAR(10) NOT NULL,
    address VARCHAR(50) NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON rating TO PUBLIC;

-- TODO-- 
CREATE TABLE user_comments (
    ratingID CHAR(10),
    text VARCHAR(255),
    FOREIGN KEY (ratingID) REFERENCES rating(ratingID) ON DELETE CASCADE
);
GRANT SELECT ON user_comments TO PUBLIC;

-- TODO-- 
CREATE TABLE picture (
    ratingID CHAR(10),
    image BLOB, 
    FOREIGN KEY (ratingID) REFERENCES rating(ratingID) ON DELETE CASCADE
);
GRANT SELECT ON picture TO PUBLIC;

-- TODO-- 
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
    PRIMARY KEY (postalCode, address),
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address) ON DELETE CASCADE
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
    FOREIGN KEY (startTime, duration) REFERENCES time_of_booking(startTime, duration) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (postalCode, address) REFERENCES bookable(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON booking_details TO PUBLIC;

-- TODO-- 
CREATE TABLE categorizes (
    catName VARCHAR(50),
    postalCode VARCHAR(10),
    address VARCHAR(50),
    PRIMARY KEY (catName, postalCode, address),
    FOREIGN KEY (catName) REFERENCES category(catName) ON DELETE CASCADE,
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON categorizes TO PUBLIC;

CREATE TABLE parks (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    area INT,
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON parks TO PUBLIC;

CREATE TABLE museums (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    cost FLOAT,
    type VARCHAR(50),
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON museums TO PUBLIC;

CREATE TABLE restaurant (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    cuisineType VARCHAR(50),
    FOREIGN KEY (postalCode, address) REFERENCES bookable(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON restaurant TO PUBLIC;

CREATE TABLE hotel (
    postalCode VARCHAR(10),
    address VARCHAR(50),
    price FLOAT,
    stars INT,
    FOREIGN KEY (postalCode, address) REFERENCES bookable(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON hotel TO PUBLIC;


-- TODO-- 
CREATE TABLE event_time (
    startTime VARCHAR(50),
    end_time VARCHAR(50),
    duration VARCHAR(50),
    PRIMARY KEY (startTime, duration)
);
GRANT SELECT ON event_time TO PUBLIC;


-- TODO-- 
CREATE TABLE event_details (
    eventName VARCHAR(50),
    startTime VARCHAR(50),
    duration VARCHAR(50),
    host VARCHAR(50),
    postalCode VARCHAR(10),
    address VARCHAR(50),
    PRIMARY KEY (eventName, startTime, duration),
    FOREIGN KEY (postalCode, address) REFERENCES locations(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON event_details TO PUBLIC;



-- users table
INSERT INTO users VALUES ('1248484739', 'Greg', 'JumpingMan', 'aKask3*k', 4, 'GregDuck@gmail.com');
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
INSERT INTO city_details VALUES ('BC', 'Richmond');
INSERT INTO city_details VALUES ('BC', 'Coquitlam');
INSERT INTO city_details VALUES ('BC', 'Surrey');
INSERT INTO city_details VALUES ('BC', 'Burnaby');
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

-- Locations for Bookables (10 Hotels and 10 Restaurants)
INSERT INTO locations VALUES ('LOC001', 'Hotel 1', 'P123456', '123 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC002', 'Restaurant 1', 'P123457', '124 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC003', 'Hotel 2', 'P223456', '125 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC004', 'Restaurant 2', 'P223457', '126 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC005', 'Hotel 3', 'P323456', '127 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC006', 'Restaurant 3', 'P323457', '128 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC007', 'Hotel 4', 'P423456', '129 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC008', 'Restaurant 4', 'P423457', '130 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC009', 'Hotel 5', 'P523456', '131 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC010', 'Restaurant 5', 'P523457', '132 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC011', 'Hotel 6', 'P623456', '133 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC012', 'Restaurant 6', 'P623457', '134 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC013', 'Hotel 7', 'P723456', '135 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC014', 'Restaurant 7', 'P723457', '136 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC015', 'Hotel 8', 'P823456', '137 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC016', 'Restaurant 8', 'P823457', '138 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC017', 'Hotel 9', 'P923456', '139 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC018', 'Restaurant 9', 'P923457', '140 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC019', 'Hotel 10', 'P103456', '141 Main St', '8AM-10PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC020', 'Restaurant 10', 'P103457', '142 Main St', '8AM-10PM', 'BC', 'Vancouver');

-- Locations for Museums (10)
INSERT INTO locations VALUES ('LOC021', 'Museum 1', 'M123456', '201 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC022', 'Museum 2', 'M223456', '202 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC023', 'Museum 3', 'M323456', '203 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC024', 'Museum 4', 'M423456', '204 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC025', 'Museum 5', 'M523456', '205 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC026', 'Museum 6', 'M623456', '206 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC027', 'Museum 7', 'M723456', '207 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC028', 'Museum 8', 'M823456', '208 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC029', 'Museum 9', 'M923456', '209 Culture St', '9AM-6PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC030', 'Museum 10', 'M103456', '210 Culture St', '9AM-6PM', 'BC', 'Vancouver');

-- Locations for Parks (10)
INSERT INTO locations VALUES ('LOC031', 'Park 1', 'PARK001', '301 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC032', 'Park 2', 'PARK002', '302 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC033', 'Park 3', 'PARK003', '303 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC034', 'Park 4', 'PARK004', '304 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC035', 'Park 5', 'PARK005', '305 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC036', 'Park 6', 'PARK006', '306 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC037', 'Park 7', 'PARK007', '307 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC038', 'Park 8', 'PARK008', '308 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC039', 'Park 9', 'PARK009', '309 Green Ave', '6AM-8PM', 'BC', 'Vancouver');
INSERT INTO locations VALUES ('LOC040', 'Park 10', 'PARK010', '310 Green Ave', '6AM-8PM', 'BC', 'Vancouver');

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
INSERT INTO picture VALUES ('R000000001', HEXTORAW('89504E47'));
INSERT INTO picture VALUES ('R000000002', HEXTORAW('FFD8FFE0'));
INSERT INTO picture VALUES ('R000000003', HEXTORAW('89504E47'));
INSERT INTO picture VALUES ('R000000004', HEXTORAW('FFD8FFE0'));
INSERT INTO picture VALUES ('R000000005', HEXTORAW('89504E47'));
INSERT INTO picture VALUES ('R000000006', HEXTORAW('FFD8FFE0'));
INSERT INTO picture VALUES ('R000000007', HEXTORAW('89504E47'));
INSERT INTO picture VALUES ('R000000008', HEXTORAW('FFD8FFE0'));
INSERT INTO picture VALUES ('R000000009', HEXTORAW('89504E47'));
INSERT INTO picture VALUES ('R000000010', HEXTORAW('FFD8FFE0'));

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
-- Hotels
INSERT INTO bookable VALUES ('P123456', '123 Main St', 120.00);
INSERT INTO bookable VALUES ('P223456', '125 Main St', 150.00);
INSERT INTO bookable VALUES ('P323456', '127 Main St', 180.00);
INSERT INTO bookable VALUES ('P423456', '129 Main St', 200.00);
INSERT INTO bookable VALUES ('P523456', '131 Main St', 170.00);
INSERT INTO bookable VALUES ('P623456', '133 Main St', 190.00);
INSERT INTO bookable VALUES ('P723456', '135 Main St', 160.00);
INSERT INTO bookable VALUES ('P823456', '137 Main St', 220.00);
INSERT INTO bookable VALUES ('P923456', '139 Main St', 250.00);
INSERT INTO bookable VALUES ('P103456', '141 Main St', 230.00);

-- Restaurants
INSERT INTO bookable VALUES ('P123457', '124 Main St', 30.00);
INSERT INTO bookable VALUES ('P223457', '126 Main St', 25.00);
INSERT INTO bookable VALUES ('P323457', '128 Main St', 35.00);
INSERT INTO bookable VALUES ('P423457', '130 Main St', 40.00);
INSERT INTO bookable VALUES ('P523457', '132 Main St', 45.00);
INSERT INTO bookable VALUES ('P623457', '134 Main St', 50.00);
INSERT INTO bookable VALUES ('P723457', '136 Main St', 28.00);
INSERT INTO bookable VALUES ('P823457', '138 Main St', 55.00);
INSERT INTO bookable VALUES ('P923457', '140 Main St', 60.00);
INSERT INTO bookable VALUES ('P103457', '142 Main St', 20.00);

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
INSERT INTO parks VALUES ('PARK001', '301 Green Ave', 500);
INSERT INTO parks VALUES ('PARK002', '302 Green Ave', 600);
INSERT INTO parks VALUES ('PARK003', '303 Green Ave', 700);
INSERT INTO parks VALUES ('PARK004', '304 Green Ave', 800);
INSERT INTO parks VALUES ('PARK005', '305 Green Ave', 900);
INSERT INTO parks VALUES ('PARK006', '306 Green Ave', 1000);
INSERT INTO parks VALUES ('PARK007', '307 Green Ave', 1100);
INSERT INTO parks VALUES ('PARK008', '308 Green Ave', 1200);
INSERT INTO parks VALUES ('PARK009', '309 Green Ave', 1300);
INSERT INTO parks VALUES ('PARK010', '310 Green Ave', 1400);

-- museums table
INSERT INTO museums VALUES ('M123456', '201 Culture St', 15.00, 'Art');
INSERT INTO museums VALUES ('M223456', '202 Culture St', 10.00, 'History');
INSERT INTO museums VALUES ('M323456', '203 Culture St', 20.00, 'Science');
INSERT INTO museums VALUES ('M423456', '204 Culture St', 12.00, 'Children');
INSERT INTO museums VALUES ('M523456', '205 Culture St', 18.00, 'Natural History');
INSERT INTO museums VALUES ('M623456', '206 Culture St', 25.00, 'Planetarium');
INSERT INTO museums VALUES ('M723456', '207 Culture St', 15.00, 'Heritage');
INSERT INTO museums VALUES ('M823456', '208 Culture St', 22.00, 'Photography');
INSERT INTO museums VALUES ('M923456', '209 Culture St', 19.00, 'Technology');
INSERT INTO museums VALUES ('M103456', '210 Culture St', 30.00, 'Space');

-- restaurant table
INSERT INTO restaurant VALUES ('P123457', '124 Main St', 'French Cuisine');
INSERT INTO restaurant VALUES ('P223457', '126 Main St', 'Italian Cuisine');
INSERT INTO restaurant VALUES ('P323457', '128 Main St', 'Mexican Cuisine');
INSERT INTO restaurant VALUES ('P423457', '130 Main St', 'American Cuisine');
INSERT INTO restaurant VALUES ('P523457', '132 Main St', 'Chinese Cuisine');
INSERT INTO restaurant VALUES ('P623457', '134 Main St', 'Indian Cuisine');
INSERT INTO restaurant VALUES ('P723457', '136 Main St', 'Japanese Cuisine');
INSERT INTO restaurant VALUES ('P823457', '138 Main St', 'Thai Cuisine');
INSERT INTO restaurant VALUES ('P923457', '140 Main St', 'Mediterranean Cuisine');
INSERT INTO restaurant VALUES ('P103457', '142 Main St', 'Vegan Cuisine');

-- hotel table
INSERT INTO hotel VALUES ('P123456', '123 Main St', 120.00, 5);
INSERT INTO hotel VALUES ('P223456', '125 Main St', 150.00, 4);
INSERT INTO hotel VALUES ('P323456', '127 Main St', 180.00, 5);
INSERT INTO hotel VALUES ('P423456', '129 Main St', 200.00, 4);
INSERT INTO hotel VALUES ('P523456', '131 Main St', 170.00, 3);
INSERT INTO hotel VALUES ('P623456', '133 Main St', 190.00, 5);
INSERT INTO hotel VALUES ('P723456', '135 Main St', 160.00, 4);
INSERT INTO hotel VALUES ('P823456', '137 Main St', 220.00, 5);
INSERT INTO hotel VALUES ('P923456', '139 Main St', 250.00, 5);
INSERT INTO hotel VALUES ('P103456', '141 Main St', 230.00, 5);

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





