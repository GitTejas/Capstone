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
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)

    def post(self):
        json = request.get_json()
        try:
            new_user = User(
                name = json['name'],
                email = json['email']
            )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        
        except ValueError as e:
            return {'errors': str(e)}, 400
        
        except Exception as e:
            return {"errors": "Failed to add user to database", 'message': str(e)}, 500


class UsersById(Resource):
    def get(self, id):
        users = User.query.filter(User.id == id).first()
        return make_response(users.to_dict(), 200)

    def patch(self, id):
        json = request.get_json()
        user = User.query.filter(User.id == id).first()
        if user:
            try:
                setattr(user, "name", json['name'])
                setattr(user, "email", json['email'])
                db.session.add(user)
                db.session.commit()
                return make_response(user.to_dict(), 202)
            except Exception as e:
                return make_response({"errors": "Failed to update user", "message": str(e)}, 400)
        else:
            return make_response({ "error": "User not found"}, 400)

    def delete(self, id):
        user = User.query.filter(User.id == id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            return {}, 204
        else:
            return {'error': 'User not found'}, 404

# Movie Resource
class Movies(Resource):
    def get(self):
        movies = [movie.to_dict() for movie in Movie.query.all()]
        return make_response(movies, 200)

    def post(self):
        json = request.get_json()
        try:
            new_movie = Movie(
                title = json['title'],
                genre = json['genre'],
                release_year = json['release_year'],
                image = json['image']
            )
            db.session.add(new_movie)
            db.session.commit()
            return make_response(new_movie.to_dict(), 201)
        
        except ValueError as e:
            return {'errors': str(e)}, 400
        
        except Exception as e:
            return {"errors": "Failed to add movie to database", 'message': str(e)}, 500
    
class MoviesById(Resource):
    def get(self, id):
        movies = Movie.query.filter(Movie.id == id).first()
        return make_response(movies.to_dict(), 200)

    # def patch(self, id):
    #     json = request.get_json()  # Get the JSON data from the request
    #     movie = Movie.query.filter(Movie.id == id).first()  # Find the movie by id

    #     if movie:
    #         try:
    #             # Update movie fields
    #             setattr(movie, "title", json['title'])
    #             setattr(movie, "genre", json['genre'])
    #             setattr(movie, "release_year", json['release_year'])
    #             setattr(movie, "image", json['image'])

    #             db.session.add(movie)  # Add to the session
    #             db.session.commit()  # Commit the changes to the database
    #             return make_response(movie.to_dict(), 202)  # Return the updated movie
    #         except Exception as e:
    #             return make_response({"errors": "Failed to update movie", "message": str(e)}, 400)
    #     else:
    #         return make_response({"error": "Movie not found"}, 400)

    def patch(self, id):
        json = request.get_json()  # Get the JSON data from the request
        movie = Movie.query.filter(Movie.id == id).first()  # Find the movie by id

        if movie:
            # Validate input
            if not json.get('title') or not json.get('genre') or not json.get('release_year') or not json.get('image'):
                return make_response({"error": "All fields (title, genre, release_year, image) are required"}, 400)

            try:
                # Update movie fields
                movie.title = json['title']
                movie.genre = json['genre']
                movie.release_year = json['release_year']
                movie.image = json['image']

                db.session.commit()  # Commit the changes to the database
                return make_response(movie.to_dict(), 202)  # Return the updated movie
            except Exception as e:
                return make_response({"errors": "Failed to update movie", "message": str(e)}, 400)
        else:
            return make_response({"error": "Movie not found"}, 404)
        



    def delete(self, id):
        movie = Movie.query.filter(Movie.id == id).first()

        if movie:
            db.session.delete(movie)
            db.session.commit()
            return {}, 204
        else:
            return {'error': 'Movie not found'}, 404

# Rental Resource
class Rentals(Resource):
    def get(self):
        rentals = [rental.to_dict() for rental in Rental.query.all()]
        return make_response(rentals, 200)

    def post(self):
        json = request.get_json()
        try:
            movie = Movie.query.get(json['movie_id'])
            user = User.query.get(json['user_id'])
            
            if not movie or not user:
                return make_response({'error': 'Movie or User not found'}, 404)
            # Create the new rental
            new_rental = Rental(
                due_date=json['due_date'],
                movie=movie,  # Associate the movie object
                user=user  # Associate the user object
            )
            db.session.add(new_rental)
            db.session.commit()
            return make_response(new_rental.to_dict(), 201)
        except Exception as e:
            return {"errors": "Failed to add rental", 'message': str(e)}, 500

    # def post(self):
    #     data = request.json
        
    #     # Ensure that 'user_id', 'movie_id', and 'due_date' are in the request
    #     if not all(key in data for key in ['user_id', 'movie_id', 'due_date']):
    #         return {'message': 'Missing required fields'}, 400
        
    #     rental = Rental(
    #         user_id=data['user_id'], 
    #         movie_id=data['movie_id'], 
    #         due_date=data['due_date']
    #     )
        
    #     # Add the rental to the session and commit
    #     db.session.add(rental)
    #     db.session.commit()
        
    #     return rental.to_dict(), 201

class RentalsById(Resource):
    def get(self, id):
        rentals = Rental.query.filter(Rental.id == id).first()
        return make_response(rentals.to_dict(), 200)
    
    def patch(self, id):
        json = request.get_json()
        rental = Rental.query.filter_by(id=id).first()
        
        if rental:
            movie = Movie.query.get(json['movie_id'])
            user = User.query.get(json['user_id'])
            
            if movie:
                rental.movie = movie
            if user:
                rental.user = user
            
            rental.due_date = json['due_date']

            db.session.commit()
            return make_response(rental.to_dict(), 202)
        else:
            return make_response({'error': 'Rental not found'}, 404)
        
    def delete(self, id):
        rental = Rental.query.filter(Rental.id == id).first()

        if rental:
            db.session.delete(rental)
            db.session.commit()
            return {}, 204
        else:
            return {'error': 'Rental not found'}, 404

# Rating Resource
class Ratings(Resource):

    def get(self):
        ratings = [rating.to_dict() for rating in Rating.query.all()]
        return make_response(ratings, 200)

    def post(self):
        json = request.get_json()
        try:
            movie = Movie.query.get(json['movie_id'])
            user = User.query.get(json['user_id'])
            
            if not movie or not user:
                return make_response({'error': 'Movie or User not found'}, 404)
            # Create the new rental
            new_rating = Rating(
                rating=json['score'],
                review=json['review'],
                movie=movie,  # Associate the movie object
                user=user  # Associate the user object
            )
            db.session.add(new_rating)
            db.session.commit()
            return make_response(new_rating.to_dict(), 201)
        except Exception as e:
            return {"errors": "Failed to add rating/review", 'message': str(e)}, 500

    # def post(self):
    #     data = request.json
    #     rating = Rating(
    #         user_id=data['user_id'], 
    #         movie_id=data['movie_id'], 
    #         rating=data['rating'], 
    #         review=data.get('review')
    #     )
    #     db.session.add(rating)
    #     db.session.commit()
    #     return rating.to_dict(), 201

class RatingsById(Resource):
    def get(self, id):
        ratings = Rating.query.filter(Rating.id == id).first()
        return make_response(ratings.to_dict(), 200)

# Register resources with routes
api.add_resource(Users, '/users')
api.add_resource(UsersById, "/users/<int:id>")

api.add_resource(Movies, '/movies')
api.add_resource(MoviesById, "/movies/<int:id>")

api.add_resource(Rentals, '/rentals')
api.add_resource(RentalsById, "/rentals/<int:id>")

api.add_resource(Ratings, '/ratings')
api.add_resource(RatingsById, '/ratings/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)