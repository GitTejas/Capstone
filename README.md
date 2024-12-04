# Movie Rental Tracker App

This application allows users to browse a collection of movies, rent their favorites, and leave ratings and reviews. Explore our collection and share your thoughts on the movies you love!
---

## Features

Movie Management: Add and manage video movies

Rental Management: Rent movies and choose a due date to return.

Reviews Management: Create reviews and ratings for movies 

User Management and Sign Up: Sign up as a user in order to be able to rent


## Tech Stack
Frontend: React, Formik and Yup, useContext, TailWind
Backend: Flask (Flask-RESTful for API endpoints)
Database: SQLAlchemy


## Models
1.	User - Represents users of the rental service.
|	Attributes: id, name, email
2.	Movie - Represents the movies available for rent.
|	Attributes: id, title, genre, release year and image
3.	Rental - Represents the rentals.
|	Attributes: id, user_id, movie_id, due_date
4.	Rating - Represents the reviews and ratings given by users to movies.
|	Attributes: id, user_id, movie_id, rating, review


## Relationships

Many-to-Many (A user can rent multiple movies, and a movie can be rented by multiple users):


user ⇔ movie through rental.

user ⇔ movie through review.



One-to-Many (A movie can have multiple rentals, and a movie can have multiple reviews):

movie → rental

movie → rating

user → rental (A user can have multiple rentals)

user → rating (A user can make multiple ratings/reviews)



## Database Integrity

To ensure data integrity and prevent invalid entries:

Constraints and Validations are implemented to safeguard the database.
Field-specific constraints are applied, such as ensuring unique values where required and limitations on nullability.
Form validation with Yup ensures that data integrity is maintained on both the frontend and backend.

## Usage
Add and Manage Movies: Add new movies with their details.


Rent a Movie: Rent a movie and choose a due date to return the movie.


User (sign-up): Become a user of the service in order to start renting movies. Requierd to have contact information before booking a rental!


Review a Movie: Review a movie and give it a rating out of 5 stars!.


## Form Handling
Formik is utilized for handling form submissions, and Yup is employed for schema-based validation, ensuring reliable input management across the application.

## Setup

run:

-backend-

pipenv install

pipenv shell

cd to the server directory

python seed.py

python app.py

-front-end-

open new terminal window

cd to the client directory

npm install

npm start

---

## Conclusion

Please feel free to open issues or submit pull requests to improve the Movie App.