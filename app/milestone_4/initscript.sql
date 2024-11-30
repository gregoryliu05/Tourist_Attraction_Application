drop table users CASCADE CONSTRAINTS; 
drop table category CASCADE CONSTRAINTS;
drop table city_details CASCADE CONSTRAINTS;
drop table city_time_zone CASCADE CONSTRAINTS;
drop table locations CASCADE CONSTRAINTS;
drop table rating CASCADE CONSTRAINTS;
drop table user_comments CASCADE CONSTRAINTS;
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

CREATE TABLE category (
    catName VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255)
);
GRANT SELECT ON category TO PUBLIC;

CREATE TABLE city_details (
    provinceState VARCHAR(2) NOT NULL,
    cityName VARCHAR(50) NOT NULL,
    PRIMARY KEY (provinceState, cityName)
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
    locationID VARCHAR(10) UNIQUE,
    locationName VARCHAR(50),
    postalCode VARCHAR(10),
    address VARCHAR(50),
    operationHours VARCHAR(50),
    provinceState VARCHAR(2) NOT NULL,
    cityName VARCHAR(50) NOT NULL,
    locationType VARCHAR(50) NOT NULL,
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

CREATE TABLE user_comments (
    ratingID CHAR(10),
    text VARCHAR(255),
    FOREIGN KEY (ratingID) REFERENCES rating(ratingID) ON DELETE CASCADE
);
GRANT SELECT ON user_comments TO PUBLIC;



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
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (postalCode, address) REFERENCES bookable(postalCode, address) ON DELETE CASCADE
);
GRANT SELECT ON booking_details TO PUBLIC;

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


-- TODO: Same thing, addd for fd
CREATE TABLE event_time (
    startTime VARCHAR(50),
    end_time VARCHAR(50),
    duration VARCHAR(50),
    PRIMARY KEY (startTime, duration)
);
GRANT SELECT ON event_time TO PUBLIC;


-- TODO -- 
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
INSERT INTO users VALUES ('1248484739', 'Greg', 'JumpingMan', 'aKask3*k', 12, 'GregDuck@gmail.com');
INSERT INTO users VALUES ('1000000001', 'Alice Johnson', 'alicej', 'password123', 20, 'alice@example.com');
INSERT INTO users VALUES ('1000230002', 'Bob Smith', 'bobs', 'password456', 8, 'bob@example.com');
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
INSERT INTO category VALUES ('Family-Friendly', 'Great for family, child friendly'); 
INSERT INTO category VALUES ('Good View', 'The location has good views, great for sight seeing.')


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
INSERT INTO locations VALUES ('LOC001', 'Hotel 1', 'P123456', '123 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Hotel');
INSERT INTO locations VALUES ('LOC002', 'Restaurant 1', 'P123457', '124 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC003', 'Hotel 2', 'P223456', '125 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Hotel');
INSERT INTO locations VALUES ('LOC004', 'Restaurant 2', 'P223457', '126 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC005', 'Hotel 3', 'P323456', '127 Main St', '8AM-10PM', 'BC', 'Vancouver','Hotel');
INSERT INTO locations VALUES ('LOC006', 'Restaurant 3', 'P323457', '128 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC007', 'Hotel 4', 'P423456', '129 Main St', '8AM-10PM', 'BC', 'Vancouver','Hotel');
INSERT INTO locations VALUES ('LOC008', 'Restaurant 4', 'P423457', '130 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC009', 'Hotel 5', 'P523456', '131 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Hotel');
INSERT INTO locations VALUES ('LOC010', 'Restaurant 5', 'P523457', '132 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC011', 'Hotel 6', 'P623456', '133 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Hotel');
INSERT INTO locations VALUES ('LOC012', 'Restaurant 6', 'P623457', '134 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC013', 'Hotel 7', 'P723456', '135 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Hotel');
INSERT INTO locations VALUES ('LOC014', 'Restaurant 7', 'P723457', '136 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC015', 'Hotel 8', 'P823456', '137 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Hotel');
INSERT INTO locations VALUES ('LOC016', 'Restaurant 8', 'P823457', '138 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC017', 'Hotel 9', 'P923456', '139 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Hotel');
INSERT INTO locations VALUES ('LOC018', 'Restaurant 9', 'P923457', '140 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');
INSERT INTO locations VALUES ('LOC019', 'Hotel 10', 'P103456', '141 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Hotel');
INSERT INTO locations VALUES ('LOC020', 'Restaurant 10', 'P103457', '142 Main St', '8AM-10PM', 'BC', 'Vancouver', 'Restaurant');

-- Locations for Museums (10)
INSERT INTO locations VALUES ('LOC021', 'Museum 1', 'M123456', '201 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC022', 'Museum 2', 'M223456', '202 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC023', 'Museum 3', 'M323456', '203 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC024', 'Museum 4', 'M423456', '204 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC025', 'Museum 5', 'M523456', '205 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC026', 'Museum 6', 'M623456', '206 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC027', 'Museum 7', 'M723456', '207 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC028', 'Museum 8', 'M823456', '208 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC029', 'Museum 9', 'M923456', '209 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');
INSERT INTO locations VALUES ('LOC030', 'Museum 10', 'M103456', '210 Culture St', '9AM-6PM', 'BC', 'Vancouver', 'Museum');

-- Locations for Parks (10)
INSERT INTO locations VALUES ('LOC031', 'Park 1', 'PARK001', '301 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC032', 'Park 2', 'PARK002', '302 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC033', 'Park 3', 'PARK003', '303 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC034', 'Park 4', 'PARK004', '304 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC035', 'Park 5', 'PARK005', '305 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC036', 'Park 6', 'PARK006', '306 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC037', 'Park 7', 'PARK007', '307 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC038', 'Park 8', 'PARK008', '308 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC039', 'Park 9', 'PARK009', '309 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');
INSERT INTO locations VALUES ('LOC040', 'Park 10', 'PARK010', '310 Green Ave', '6AM-8PM', 'BC', 'Vancouver', 'Park');

-- rating table
-- Ratings for Bookables (10 Hotels and 10 Restaurants)
INSERT INTO rating VALUES ('R000000001', 4.5, '1000000001', 'P123456', '123 Main St');
INSERT INTO rating VALUES ('R000000002', 4.0, '1000000001', 'P123457', '124 Main St');
INSERT INTO rating VALUES ('R000000003', 4.8, '1000000001', 'P223456', '125 Main St'); 
INSERT INTO rating VALUES ('R000000004', 3.7, '1000000001', 'P223457', '126 Main St'); 
INSERT INTO rating VALUES ('R000000005', 4.2, '1000000001', 'P323456', '127 Main St'); 
INSERT INTO rating VALUES ('R000000006', 3.5, '1000000001', 'P323457', '128 Main St'); 
INSERT INTO rating VALUES ('R000000007', 4.6, '1000000001', 'P423456', '129 Main St'); 
INSERT INTO rating VALUES ('R000000008', 2.0, '1000000001', 'P423457', '130 Main St');
INSERT INTO rating VALUES ('R000000009', 4.9, '1000000001', 'P523456', '131 Main St'); 
INSERT INTO rating VALUES ('R000000010', 3.9, '1000000001', 'P523457', '132 Main St'); 
INSERT INTO rating VALUES ('R000000011', 4.7, '1000000001', 'P623456', '133 Main St'); 
INSERT INTO rating VALUES ('R000000012', 4.1, '1000000001', 'P623457', '134 Main St'); 
INSERT INTO rating VALUES ('R000000013', 4.8, '1000000001', 'P723456', '135 Main St'); 
INSERT INTO rating VALUES ('R000000014', 3.6, '1000000001', 'P723457', '136 Main St'); 
INSERT INTO rating VALUES ('R000000015', 4.3, '1000000001', 'P823456', '137 Main St'); 
INSERT INTO rating VALUES ('R000000016', 1.0, '1000000001', 'P823457', '138 Main St'); 
INSERT INTO rating VALUES ('R000000017', 4.9, '1000000001', 'P923456', '139 Main St'); 
INSERT INTO rating VALUES ('R000000018', 3.8, '1000000001', 'P923457', '140 Main St'); 
INSERT INTO rating VALUES ('R000000019', 3.6, '1000000001', 'P103456', '141 Main St'); 
INSERT INTO rating VALUES ('R000000020', 4.3, '1000000001', 'P103457', '142 Main St'); 
INSERT INTO rating VALUES ('R000000041', 1.5, '1000000001', 'P103457', '142 Main St'); 
INSERT INTO rating VALUES ('R000000042', 2.6, '1000000001', 'P103457', '142 Main St'); 
INSERT INTO rating VALUES ('R000000043', 5.0, '1000000001', 'P103457', '142 Main St'); 

-- Ratings for Museums (10)
INSERT INTO rating VALUES ('R000000021', 1.7, '1248484739', 'M123456', '201 Culture St'); 
INSERT INTO rating VALUES ('R000000022', 4.5, '1248484739', 'M223456', '202 Culture St'); 
INSERT INTO rating VALUES ('R000000023', 1.9, '1248484739', 'M323456', '203 Culture St'); 
INSERT INTO rating VALUES ('R000000024', 1.4, '1248484739', 'M423456', '204 Culture St'); 
INSERT INTO rating VALUES ('R000000025', 4.3, '1248484739', 'M523456', '205 Culture St'); 
INSERT INTO rating VALUES ('R000000026', 2.8, '1248484739', 'M623456', '206 Culture St'); 
INSERT INTO rating VALUES ('R000000027', 4.2, '1248484739', 'M723456', '207 Culture St'); 
INSERT INTO rating VALUES ('R000000028', 4.5, '1248484739', 'M823456', '208 Culture St'); 
INSERT INTO rating VALUES ('R000000029', 4.6, '1248484739', 'M923456', '209 Culture St'); 
INSERT INTO rating VALUES ('R000000030', 4.9, '1248484739', 'M103456', '210 Culture St'); 

-- Ratings for Parks (10)
INSERT INTO rating VALUES ('R000000031', 4.4, '1248484739', 'PARK001', '301 Green Ave'); 
INSERT INTO rating VALUES ('R000000032', 2.3, '1248484739', 'PARK002', '302 Green Ave'); 
INSERT INTO rating VALUES ('R000000033', 4.8, '1000230002', 'PARK003', '303 Green Ave'); 
INSERT INTO rating VALUES ('R000000034', 4.6, '1000230002', 'PARK004', '304 Green Ave'); 
INSERT INTO rating VALUES ('R000000035', 4.2, '1000230002', 'PARK005', '305 Green Ave'); 
INSERT INTO rating VALUES ('R000000036', 4.5, '1000230002', 'PARK006', '306 Green Ave');
INSERT INTO rating VALUES ('R000000037', 4.7, '1000230002', 'PARK007', '307 Green Ave'); 
INSERT INTO rating VALUES ('R000000038', 4.9, '1000230002', 'PARK008', '308 Green Ave'); 
INSERT INTO rating VALUES ('R000000039', 4.8, '1000230002', 'PARK009', '309 Green Ave'); 
INSERT INTO rating VALUES ('R000000040', 4.6, '1000230002', 'PARK010', '310 Green Ave'); 

-- user_comments table 
INSERT INTO user_comments VALUES ('R000000001', 'Great place, highly recommend!');
INSERT INTO user_comments VALUES ('R000000002', 'Decent, but could be better.');
INSERT INTO user_comments VALUES ('R000000003', 'Absolutely fantastic!');
INSERT INTO user_comments VALUES ('R000000004', 'Not very satisfied with the experience.');
INSERT INTO user_comments VALUES ('R000000005', 'Would visit again.');
INSERT INTO user_comments VALUES ('R000000006', 'Very clean and well-maintained.');
INSERT INTO user_comments VALUES ('R000000007', 'Average place, nothing special.');
INSERT INTO user_comments VALUES ('R000000008', 'Horrible Service, Bad Food.');
INSERT INTO user_comments VALUES ('R000000009', 'Best experience ever!');
INSERT INTO user_comments VALUES ('R000000010', 'Friendly staff and great atmosphere.');
INSERT INTO user_comments VALUES ('R000000011', 'Luxurious hotel with exceptional service.');
INSERT INTO user_comments VALUES ('R000000012', 'Cozy restaurant, loved the food.');
INSERT INTO user_comments VALUES ('R000000013', 'Top-notch hotel, very comfortable.');
INSERT INTO user_comments VALUES ('R000000014', 'Mediocre service, average food.');
INSERT INTO user_comments VALUES ('R000000015', 'Good location and excellent service.');
INSERT INTO user_comments VALUES ('R000000016', 'Terrible experience, will not return.');
INSERT INTO user_comments VALUES ('R000000017', 'Amazing stay, highly recommend.');
INSERT INTO user_comments VALUES ('R000000018', 'Great ambiance but pricey.');
INSERT INTO user_comments VALUES ('R000000019', 'Nice place to stay for a quick trip.');
INSERT INTO user_comments VALUES ('R000000020', 'Good value for the price.');
INSERT INTO user_comments VALUES ('R000000021', 'Informative museum, loved the exhibits.');
INSERT INTO user_comments VALUES ('R000000022', 'Very well-maintained museum.');
INSERT INTO user_comments VALUES ('R000000023', 'Small museum but interesting displays.');
INSERT INTO user_comments VALUES ('R000000024', 'Not worth the price of admission.');
INSERT INTO user_comments VALUES ('R000000025', 'Great place to spend the afternoon.');
INSERT INTO user_comments VALUES ('R000000026', 'Educational experience, highly recommend.');
INSERT INTO user_comments VALUES ('R000000027', 'One of the best museums I’ve visited.');
INSERT INTO user_comments VALUES ('R000000028', 'Clean and well-organized museum.');
INSERT INTO user_comments VALUES ('R000000029', 'Excellent place for kids and adults.');
INSERT INTO user_comments VALUES ('R000000030', 'The museum was a bit crowded but nice.');
INSERT INTO user_comments VALUES ('R000000031', 'Beautiful park, very relaxing.');
INSERT INTO user_comments VALUES ('R000000032', 'Decent park but not very clean.');
INSERT INTO user_comments VALUES ('R000000033', 'Amazing views and plenty of space.');
INSERT INTO user_comments VALUES ('R000000034', 'Quiet and serene park.');
INSERT INTO user_comments VALUES ('R000000035', 'Well-maintained and family-friendly.');
INSERT INTO user_comments VALUES ('R000000036', 'Great park for jogging and picnics.');
INSERT INTO user_comments VALUES ('R000000037', 'Spacious park with lots of greenery.');
INSERT INTO user_comments VALUES ('R000000038', 'Perfect for a weekend outing.');
INSERT INTO user_comments VALUES ('R000000039', 'Peaceful place to relax and unwind.');
INSERT INTO user_comments VALUES ('R000000040', 'The park was clean and well-maintained.');
INSERT INTO user_comments VALUES ('R000000041', 'Horrible Place, awful food'); 
INSERT INTO user_comments VALUES ('R000000042', 'mid'); 
INSERT INTO user_comments VALUES ('R000000043', 'good eats'); 




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
INSERT INTO booking_details VALUES ('B000000001', '08:00 AM', '2 hours', 4, '1000000001', 'P123456', '123 Main St');
INSERT INTO booking_details VALUES ('B000000002', '10:00 AM', '1.5 hours', 2, '1000230002',  'P123457', '124 Main St');
INSERT INTO booking_details VALUES ('B000000003', '12:00 PM', '1.5 hours', 5, '1000000003',  'P223456', '125 Main St');
INSERT INTO booking_details VALUES ('B000000004', '02:00 PM', '1.5 hours', 3, '1000000004','P223457', '126 Main St');
INSERT INTO booking_details VALUES ('B000000005', '03:30 PM', '1 hour', 6, '1000000005','P323456', '127 Main St');
INSERT INTO booking_details VALUES ('B000000006', '05:00 PM', '1.5 hours', 8, '1000000006', 'P323457', '128 Main St');
INSERT INTO booking_details VALUES ('B000000007', '07:00 PM', '1 hour', 4, '1000000007',  'P423456', '129 Main St');
INSERT INTO booking_details VALUES ('B000000008', '08:30 PM', '1 hour', 7, '1000000008', 'P423457', '130 Main St');
INSERT INTO booking_details VALUES ('B000000009', '09:30 PM', '1.5 hours', 5, '1000000009', 'P523456', '131 Main St');
INSERT INTO booking_details VALUES ('B000000010', '11:00 PM', '1 hour', 9, '1000000010', 'P523457', '132 Main St');

-- categorizes table
INSERT INTO categorizes VALUES ('Park', 'PARK001', '301 Green Ave');
INSERT INTO categorizes VALUES ('Museum', 'M123456', '201 Culture St');
INSERT INTO categorizes VALUES ('Restaurant', 'P123457', '124 Main St');
INSERT INTO categorizes VALUES ('Hotel', 'P123456', '123 Main St');
INSERT INTO categorizes VALUES ('Park', 'PARK002', '302 Green Ave');
INSERT INTO categorizes VALUES ('Museum', 'M223456', '202 Culture St');
INSERT INTO categorizes VALUES ('Restaurant', 'P223457', '126 Main St');
INSERT INTO categorizes VALUES ('Hotel', 'P223456', '125 Main St');
INSERT INTO categorizes VALUES ('Park', 'PARK003', '303 Green Ave');

-- Location with multiple categories
INSERT INTO categorizes VALUES ('Museum', 'M323456', '203 Culture St');
INSERT INTO categorizes VALUES ('Family-Friendly', 'M323456', '203 Culture St');
INSERT INTO categorizes VALUES ('Good View', 'M323456', '203 Culture St');

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

--same name, different event
INSERT INTO event_details VALUES ('Music Concert', '10:00 AM', '3 hours', 'Festival Organizers', 'P123458', '124 Music Ave');
INSERT INTO event_details VALUES ('Music Concert', '11:30 AM', '1.5 hours', 'Live Nation', 'P123459', '125 Music Ave');
INSERT INTO event_details VALUES ('Music Concert', '01:00 PM', '2 hours', 'Rock Band', 'P123460', '126 Music Ave');

INSERT INTO event_details VALUES ('Art Exhibition', '01:00 PM', '3 hours', 'Art World', 'P123461', '125 Art St');
INSERT INTO event_details VALUES ('Art Exhibition', '03:30 PM', '2 hours', 'Gallery Hub', 'P123462', '126 Art St');
INSERT INTO event_details VALUES ('Art Exhibition', '05:00 PM', '4 hours', 'Local Artists', 'P123463', '127 Art St');

INSERT INTO event_details VALUES ('Food Festival', '03:00 PM', '5 hours', 'Food Lovers International', 'P223458', '126 Food Blvd');
INSERT INTO event_details VALUES ('Food Festival', '06:00 PM', '3 hours', 'Local Chefs', 'P223459', '127 Food Blvd');
INSERT INTO event_details VALUES ('Food Festival', '07:30 PM', '2 hours', 'Culinary Society', 'P223460', '128 Food Blvd');

INSERT INTO event_details VALUES ('Book Reading', '04:00 PM', '1.5 hours', 'Authors Guild', 'P223461', '127 Book St');
INSERT INTO event_details VALUES ('Book Reading', '05:30 PM', '2 hours', 'Local Writers', 'P223462', '128 Book St');
INSERT INTO event_details VALUES ('Book Reading', '07:00 PM', '1 hour', 'Reading Club', 'P223463', '129 Book St');

INSERT INTO event_details VALUES ('Outdoor Movie', '07:00 PM', '2 hours', 'Cinema Nights', 'P323458', '128 Movie Park');
INSERT INTO event_details VALUES ('Outdoor Movie', '08:30 PM', '3 hours', 'Open Sky Films', 'P323459', '129 Movie Park');
INSERT INTO event_details VALUES ('Outdoor Movie', '10:00 PM', '1.5 hours', 'Community Cinema', 'P323460', '130 Movie Park');

INSERT INTO event_details VALUES ('Yoga Class', '08:00 AM', '1 hour', 'Health Haven', 'P323458', '129 Yoga Blvd');
INSERT INTO event_details VALUES ('Yoga Class', '06:30 PM', '2.5 hours', 'Zen Masters', 'P323459', '130 Yoga Blvd');
INSERT INTO event_details VALUES ('Yoga Class', '09:00 PM', '1.5 hours', 'Local Instructors', 'P323460', '131 Yoga Blvd');

INSERT INTO event_details VALUES ('Cooking Workshop', '11:00 AM', '2 hours', 'Culinary Academy', 'P423458', '130 Chef Rd');
INSERT INTO event_details VALUES ('Cooking Workshop', '01:30 PM', '3 hours', 'Master Chefs', 'P423459', '131 Chef Rd');
INSERT INTO event_details VALUES ('Cooking Workshop', '03:00 PM', '1.5 hours', 'Cooking Enthusiasts', 'P423460', '132 Chef Rd');

INSERT INTO event_details VALUES ('Tech Meetup', '02:00 PM', '2 hours', 'Startup Hub', 'P423458', '131 Tech Blvd');
INSERT INTO event_details VALUES ('Tech Meetup', '04:00 PM', '1.5 hours', 'Innovation Center', 'P423459', '132 Tech Blvd');
INSERT INTO event_details VALUES ('Tech Meetup', '06:00 PM', '3 hours', 'Tech Visionaries', 'P423460', '133 Tech Blvd');

INSERT INTO event_details VALUES ('Charity Run', '07:00 AM', '4 hours', 'Health Advocates', 'P523458', '132 Sports Ave');
INSERT INTO event_details VALUES ('Charity Run', '09:30 AM', '3.5 hours', 'Community Runners', 'P523459', '133 Sports Ave');
INSERT INTO event_details VALUES ('Charity Run', '12:00 PM', '2.5 hours', 'Local Heroes', 'P523460', '134 Sports Ave');


--same host different event
INSERT INTO event_details VALUES ('Jazz Night', '08:00 PM', '2.5 hours', 'City Events', 'P123461', '200 Music Hall');
INSERT INTO event_details VALUES ('Rock Concert', '09:30 PM', '3 hours', 'City Events', 'P123462', '201 Concert Blvd');
INSERT INTO event_details VALUES ('Classical Recital', '07:00 PM', '1.5 hours', 'City Events', 'P123463', '202 Symphony St');

INSERT INTO event_details VALUES ('Sculpture Exhibition', '10:00 AM', '4 hours', 'Art Center', 'P123464', '300 Art Plaza');
INSERT INTO event_details VALUES ('Photography Showcase', '02:00 PM', '3 hours', 'Art Center', 'P123465', '301 Exhibit Ave');
INSERT INTO event_details VALUES ('Modern Art Fair', '06:00 PM', '5 hours', 'Art Center', 'P123466', '302 Gallery Lane');

INSERT INTO event_details VALUES ('Farmers Market', '07:00 AM', '6 hours', 'Food Lovers', 'P223461', '400 Fresh Lane');
INSERT INTO event_details VALUES ('BBQ Festival', '01:00 PM', '4 hours', 'Food Lovers', 'P223462', '401 Grill Blvd');
INSERT INTO event_details VALUES ('Dessert Fair', '05:30 PM', '3.5 hours', 'Food Lovers', 'P223463', '402 Sweet St');

INSERT INTO event_details VALUES ('Storytelling Session', '11:00 AM', '1 hour', 'Local Library', 'P223464', '500 Book Ave');
INSERT INTO event_details VALUES ('Poetry Reading', '02:00 PM', '1.5 hours', 'Local Library', 'P223465', '501 Literature St');
INSERT INTO event_details VALUES ('Fiction Writers Meetup', '04:00 PM', '2 hours', 'Local Library', 'P223466', '502 Creativity Blvd');

INSERT INTO event_details VALUES ('Fireworks Display', '09:00 PM', '1 hour', 'City Council', 'P323461', '600 Celebration Park');
INSERT INTO event_details VALUES ('Parade Event', '10:00 AM', '3 hours', 'City Council', 'P323462', '601 Downtown Blvd');
INSERT INTO event_details VALUES ('Community Festival', '12:00 PM', '5 hours', 'City Council', 'P323463', '602 Unity St');

INSERT INTO event_details VALUES ('Meditation Workshop', '06:00 AM', '1.5 hours', 'Wellness Club', 'P323464', '700 Peace Blvd');
INSERT INTO event_details VALUES ('Pilates Class', '08:00 AM', '2 hours', 'Wellness Club', 'P323465', '701 Fitness Ave');
INSERT INTO event_details VALUES ('Stretching Session', '07:00 PM', '1 hour', 'Wellness Club', 'P323466', '702 Health St');

INSERT INTO event_details VALUES ('Pasta Making Class', '11:00 AM', '2.5 hours', 'Chef School', 'P423461', '800 Gourmet Blvd');
INSERT INTO event_details VALUES ('Bread Baking Workshop', '02:00 PM', '3 hours', 'Chef School', 'P423462', '801 Artisan St');
INSERT INTO event_details VALUES ('Dessert Decoration', '05:30 PM', '2 hours', 'Chef School', 'P423463', '802 Sweet Lane');

INSERT INTO event_details VALUES ('AI Tech Talk', '10:00 AM', '2 hours', 'Tech Community', 'P423464', '900 Innovation Ave');
INSERT INTO event_details VALUES ('Blockchain Meetup', '01:30 PM', '2.5 hours', 'Tech Community', 'P423465', '901 Crypto Blvd');
INSERT INTO event_details VALUES ('Cybersecurity Seminar', '04:00 PM', '3 hours', 'Tech Community', 'P423466', '902 Security St');

INSERT INTO event_details VALUES ('Soccer Tournament', '08:00 AM', '4 hours', 'Local Sports', 'P523461', '1000 Sports Park');
INSERT INTO event_details VALUES ('Basketball Game', '12:00 PM', '3.5 hours', 'Local Sports', 'P523462', '1001 Hoops Blvd');
INSERT INTO event_details VALUES ('Running Workshop', '03:00 PM', '2 hours', 'Local Sports', 'P523463', '1002 Marathon Lane');

--Same postal code, different event
INSERT INTO event_details VALUES ('Jazz Night', '08:00 PM', '2.5 hours', 'City Events', 'P123456', '123 Main St');
INSERT INTO event_details VALUES ('Rock Concert', '09:30 PM', '3 hours', 'Festival Organizers', 'P123456', '123 Music Hall');
INSERT INTO event_details VALUES ('Classical Recital', '07:00 PM', '1.5 hours', 'Symphony Group', 'P123456', '123 Symphony St');

INSERT INTO event_details VALUES ('Food Tasting', '01:00 PM', '2 hours', 'Culinary Masters', 'P223457', '125 Culinary Lane');
INSERT INTO event_details VALUES ('Wine and Cheese Night', '07:30 PM', '3 hours', 'Food Lovers', 'P223457', '125 Gourmet Ave');
INSERT INTO event_details VALUES ('Farmers Market', '08:00 AM', '5 hours', 'Local Farmers', 'P223457', '125 Fresh Blvd');

INSERT INTO event_details VALUES ('Outdoor Yoga', '06:30 AM', '1 hour', 'Wellness Club', 'P323456', '127 Park Lane');
INSERT INTO event_details VALUES ('Movie Screening', '09:00 PM', '2 hours', 'Open Air Cinema', 'P323456', '127 Film Blvd');
INSERT INTO event_details VALUES ('Meditation Workshop', '08:00 AM', '1.5 hours', 'Health Haven', 'P323456', '127 Serenity Ave');

INSERT INTO event_details VALUES ('Tech Expo', '10:00 AM', '3 hours', 'Tech Innovators', 'P423457', '130 Tech Plaza');
INSERT INTO event_details VALUES ('Startup Showcase', '01:30 PM', '2.5 hours', 'Entrepreneur Hub', 'P423457', '130 Business Blvd');
INSERT INTO event_details VALUES ('Coding Bootcamp', '03:00 PM', '4 hours', 'Developer Society', 'P423457', '130 Code Ave');

INSERT INTO event_details VALUES ('Soccer Match', '08:00 AM', '2 hours', 'Local League', 'P523456', '131 Sports Field');
INSERT INTO event_details VALUES ('Basketball Game', '10:30 AM', '1.5 hours', 'City Sports Club', 'P523456', '131 Arena Blvd');
INSERT INTO event_details VALUES ('Charity Marathon', '02:00 PM', '3 hours', 'Community Runners', 'P523456', '131 Track St');








