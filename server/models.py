from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import func
from config import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    # Add Relationships
    rentals = db.relationship('Rental', back_populates='user')  # Corrected to singular 'user'
    ratings = db.relationship('Rating', back_populates='user')  # Corrected to singular 'user'

    serialize_rules = ('-rentals', '-ratings')  # Exclude these relationships from serialization

    ## Validations

    def __repr__(self):
        return f'<User {self.id}: {self.name}>'


class Movie(db.Model, SerializerMixin):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    release_year = db.Column(db.Integer, nullable=False)  # Add this line for the release_year
    image = db.Column(db.String)

    # Add Relationships
    rentals = db.relationship('Rental', back_populates='movie')  # Link back to Rental
    ratings = db.relationship('Rating', back_populates='movie')


    serialize_rules = ('-rentals', '-ratings')  # Exclude these relationships from serialization


    ## Validations


    def __repr__(self):
        return f'<Movie {self.id}: {self.title}>'


class Rental(db.Model, SerializerMixin):
    __tablename__ = "rentals"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)

    # Add Relationships
    movie = db.relationship('Movie', back_populates='rentals')  # Link back to Movie
    user = db.relationship('User', back_populates='rentals')

    serialize_rules = ('-movie', '-user')  # Exclude the circular references



    ## Validations



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

    # Add Relationships
    movie = db.relationship('Movie', back_populates='ratings')  # Added to match 'movie'
    user = db.relationship('User', back_populates='ratings')  # Added to match 'user'





    ## Validations



    def __repr__(self):
        return f'<Rating {self.id}>'
