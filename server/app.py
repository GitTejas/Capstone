#!/usr/bin/env python3

from flask import request, make_response, abort
from flask_restful import Resource
from sqlalchemy import func
from config import app, db, api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from models import User, Movie, Rental, Rating

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# User Resource
class UserResource(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict() for user in users], 200

    def post(self):
        data = request.json
        user = User(name=data['name'], email=data['email'])
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

# Movie Resource
class MovieResource(Resource):
    def get(self):
        movies = Movie.query.all()
        return [movie.to_dict() for movie in movies], 200

    def post(self):
        data = request.json
        movie = Movie(title=data['title'], genre=data['genre'], release_year=data['release_year'])
        db.session.add(movie)
        db.session.commit()
        return movie.to_dict(), 201

# Rental Resource
class RentalResource(Resource):
    def get(self):
        rentals = Rental.query.all()
        return [rental.to_dict() for rental in rentals], 200

    def post(self):
        data = request.json
        
        # Ensure that 'user_id', 'movie_id', and 'due_date' are in the request
        if not all(key in data for key in ['user_id', 'movie_id', 'due_date']):
            return {'message': 'Missing required fields'}, 400
        
        rental = Rental(
            user_id=data['user_id'], 
            movie_id=data['movie_id'], 
            due_date=data['due_date']
        )
        
        # Add the rental to the session and commit
        db.session.add(rental)
        db.session.commit()
        
        return rental.to_dict(), 201


# Rating Resource
class RatingResource(Resource):

    def get(self):
        ratings = Rating.query.all()
        return [rating.to_dict() for rating in ratings], 200

    def post(self):
        data = request.json
        rating = Rating(
            user_id=data['user_id'], 
            movie_id=data['movie_id'], 
            rating=data['rating'], 
            review=data.get('review')
        )
        db.session.add(rating)
        db.session.commit()
        return rating.to_dict(), 201

# Register resources with routes
api.add_resource(UserResource, '/users')
api.add_resource(MovieResource, '/movies')
api.add_resource(RentalResource, '/rentals')
api.add_resource(RatingResource, '/ratings')



if __name__ == '__main__':
    app.run(port=5555, debug=True)