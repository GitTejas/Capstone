#!/usr/bin/env python3
from flask import request, make_response, abort
from flask_restful import Resource
from sqlalchemy import func
from config import app, db, api
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


    def patch(self, id):
        json = request.get_json()
        movie = Movie.query.filter(Movie.id == id).first()

        if movie:
            if not json.get('title') or not json.get('genre') or not json.get('release_year') or not json.get('image'):
                return make_response({"error": "All fields (title, genre, release_year, image) are required"}, 400)

            try:
                movie.title = json['title']
                movie.genre = json['genre']
                movie.release_year = json['release_year']
                movie.image = json['image']

                db.session.commit() 
                return make_response(movie.to_dict(), 202)
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
            movie = db.session.get(Movie, json['movie_id'])
            user = db.session.get(User, json['user_id'])
            
            if not movie or not user:
                return make_response({'error': 'Movie or User not found'}, 404)
            new_rental = Rental(
                due_date=json['due_date'],
                movie=movie,  
                user=user  
            )
            db.session.add(new_rental)
            db.session.commit()
            return make_response(new_rental.to_dict(), 201)
        except Exception as e:
            return {"errors": "Failed to add rental", 'message': str(e)}, 500

class RentalsById(Resource):
    def get(self, id):
        rentals = Rental.query.filter(Rental.id == id).first()
        return make_response(rentals.to_dict(), 200)
    
    def patch(self, id):
        json = request.get_json()
        rental = Rental.query.filter_by(id=id).first()
        
        if rental:
            movie = db.session.get(Movie, json['movie_id'])
            user = db.session.get(User, json['user_id'])
            
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

# Rating/Review Resource
class Ratings(Resource):

    def get(self):
        ratings = [rating.to_dict() for rating in Rating.query.all()]
        return make_response(ratings, 200)

    def post(self):
        json = request.get_json()
        try:
            movie = db.session.get(Movie, json['movie_id'])
            user = db.session.get(User, json['user_id'])
            
            if not movie or not user:
                return make_response({'error': 'Movie or User not found'}, 404)

            new_rating = Rating(
                rating=json['rating'],
                review=json['review'],
                movie=movie,  
                user=user  
            )
            db.session.add(new_rating)
            db.session.commit()
            return make_response(new_rating.to_dict(), 201)
        except Exception as e:
            return {"errors": "Failed to add rating/review", 'message': str(e)}, 500

class RatingsById(Resource):
    def get(self, id):
        ratings = Rating.query.filter(Rating.id == id).first()
        return make_response(ratings.to_dict(), 200)
    
    def delete(self, id):
        rating = Rating.query.filter(Rating.id == id).first()

        if rating:
            db.session.delete(rating)
            db.session.commit()
            return {}, 204
        else:
            return {'error': 'Review not found'}, 404

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