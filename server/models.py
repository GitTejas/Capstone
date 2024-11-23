from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import func
from config import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import re

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    rentals = db.relationship('Rental', back_populates='user') 
    ratings = db.relationship('Rating', back_populates='user')  

    serialize_rules = ('-rentals', '-ratings')

    @validates("name")
    def validates_name(self, key, name):
        if isinstance(name, str) and 2 <= len(name) <= 100:
            return name.strip()
        else:
            raise ValueError("Name must be a string with 2 to 100 characters.")
            
    @validates("email")
    def validates_email(self, key, email):
        email_regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if isinstance(email, str) and re.match(email_regex, email):
            return email.strip().lower()
        else:
            raise ValueError("Email must be a valid email address.")

    def __repr__(self):
        return f'<User {self.id}: {self.name}>'


class Movie(db.Model, SerializerMixin):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    release_year = db.Column(db.Integer, nullable=False)  
    image = db.Column(db.String)

    rentals = db.relationship('Rental', back_populates='movie')  
    ratings = db.relationship('Rating', back_populates='movie')


    serialize_rules = ('-rentals', '-ratings')  

    @validates("title")
    def validates_title(self, key, title):
        if isinstance(title, str) and 1 < len(title) <= 100:
            return title.strip()
        else:
            raise ValueError("Title must be a string with more than 1 character and up to 100 characters.")

    @validates("genre")
    def validates_genre(self, key, genre):
        if isinstance(genre, str) and 1 < len(genre) <= 50:
            return genre.strip()
        else:
            raise ValueError("Genre must be a string with more than 1 character and up to 50 characters.")

    @validates("release_year")
    def validates_release_year(self, key, release_year):
        current_year = datetime.now().year
        if isinstance(release_year, int) and 1800 <= release_year <= current_year:
            return release_year
        else:
            raise ValueError(f"Release year must be an integer between 1800 and {current_year}.")

    @validates("image")
    def validates_image(self, key, image):
        if not isinstance(image, str) or not image.strip():
            raise ValueError("Image must be a non-empty string.")
        return image


    def __repr__(self):
        return f'<Movie {self.id}: {self.title}>'



class Rental(db.Model, SerializerMixin):
    __tablename__ = "rentals"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)

    movie = db.relationship('Movie', back_populates='rentals')  
    user = db.relationship('User', back_populates='rentals')

    serialize_rules = ('-movie', '-user')  

    @validates("user_id")
    def validates_user_id(self, key, user_id):
        if isinstance(user_id, int) and user_id > 0:
            return user_id
        else:
            raise ValueError("User ID must be a positive integer.")

    @validates("movie_id")
    def validates_movie_id(self, key, movie_id):
        if isinstance(movie_id, int) and movie_id > 0:
            return movie_id
        else:
            raise ValueError("Movie ID must be a positive integer.")

    @validates("due_date")
    def validates_due_date(self, key, due_date):
        if due_date is None:
            return None  
        if isinstance(due_date, (datetime, str)):
            if isinstance(due_date, str):
                try:
                    due_date = datetime.fromisoformat(due_date)
                except ValueError:
                    raise ValueError("Due date must be a valid ISO 8601 date string or a `datetime` object.")
            if due_date > datetime.now():
                return due_date
            else:
                raise ValueError("Due date must be in the future.")
        else:
            raise ValueError("Due date must be a valid `datetime` object or an ISO 8601 string.")


    def __repr__(self):
        return f'<Rental {self.id}>'


class Rating(db.Model, SerializerMixin):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)

    movie = db.relationship('Movie', back_populates='ratings')  
    user = db.relationship('User', back_populates='ratings') 


    @validates("user_id")
    def validates_user_id(self, key, user_id):
        if isinstance(user_id, int) and user_id > 0:
            return user_id
        else:
            raise ValueError("User ID must be a positive integer.")

    @validates("movie_id")
    def validates_movie_id(self, key, movie_id):
        if isinstance(movie_id, int) and movie_id > 0:
            return movie_id
        else:
            raise ValueError("Movie ID must be a positive integer.")

    @validates("rating")
    def validates_rating(self, key, rating):
        if isinstance(rating, int) and 1 <= rating <= 10:
            return rating
        else:
            raise ValueError("Rating must be an integer between 1 and 10.")

    @validates("review")
    def validates_review(self, key, review):
        if review is None:
            return None  
        if isinstance(review, str) and 0 < len(review) <= 500:
            return review
        else:
            raise ValueError("Review must be a string with up to 500 characters.")

    def __repr__(self):
        return f'<Rating {self.id}>'
