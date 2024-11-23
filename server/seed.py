#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker
from random import random

# Local imports
from app import app
from models import db, User, Movie, Rental, Rating

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()

        # Seeding Users
        print("Seeding Users...")
        users = []
        for _ in range(10):
            user = User(
                name=fake.name(),
                email=fake.email()
            )
            users.append(user)
            db.session.add(user)

        # Seeding Movies
        predefined_movies = [
            {"title": "The Shawshank Redemption", "image": "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"},
            {"title": "The Godfather", "image": "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"},
            {"title": "The Dark Knight", "image": "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/500678F/batman-the-dark-knight_dc-comics_gallery_5c4e11bbb740a.jpg"},
            {"title": "Pulp Fiction", "image": "https://i.ebayimg.com/00/s/MTYwMFgxMDcx/z/bLYAAOSwffNjoG1q/$_57.JPG?set_id=8800005007"},
            {"title": "Forrest Gump", "image": "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg"},
            {"title": "Inception", "image": "https://render.fineartamerica.com/images/rendered/medium/print/6/8/break/images/artworkimages/medium/3/inception-bo-kev.jpg"},
            {"title": "Interstellar", "image": "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"},
            {"title": "Parasite", "image": "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png"},
            {"title": "Joker", "image": "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg"},
            {"title": "Avengers: Endgame", "image": "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg"},
        ]

        print("Seeding Movies...")
        movies = []
        for movie_data in predefined_movies:
            movie = Movie(
                title=movie_data["title"],
                genre=rc(["Drama", "Action", "Thriller", "Comedy", "Sci-Fi"]),
                release_year=fake.date_between(start_date="-20y", end_date="today").year,
                image=movie_data["image"]
            )
            movies.append(movie)
            db.session.add(movie)

        db.session.commit()  


        # Seeding Rentals
        print("Seeding Rentals...")
        if not users or not movies:
            print("Error: Users or Movies list is empty.")
        else:
            print(f"Users: {[user.id for user in users]}")  
            print(f"Movies: {[movie.id for movie in movies]}")  

            for _ in range(10):
                
                user = db.session.query(User).order_by(db.func.random()).first()  
                movie = db.session.query(Movie).order_by(db.func.random()).first()  

                if not user or not movie:
                    print(f"Skipping rental: Invalid user_id or movie_id (user: {user}, movie: {movie})")
                    continue  

                due_date = datetime.today() + timedelta(days=randint(7, 21))

                rental = Rental(
                    user_id=user.id,  
                    movie_id=movie.id,  
                    due_date=due_date
                )
                db.session.add(rental)

            db.session.commit()
            print("Seeding complete!")


        # Seeding Ratings
        print("Seeding Ratings...")
        for _ in range(20):
            rating = Rating(
                rating=randint(1, 5),
                review=fake.sentence(nb_words=10),
                user_id=rc([user.id for user in users]),  
                movie_id=rc([movie.id for movie in movies]) 
            )
            db.session.add(rating)

        db.session.commit()
        print("Seeding complete!")
