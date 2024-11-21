#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Movie, Rental, Rating

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Drop existing tables and create new ones
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
            {"title": "The Dark Knight", "image": "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg"},
            {"title": "Pulp Fiction", "image": "https://upload.wikimedia.org/wikipedia/en/8/82/Pulp_Fiction_cover.jpg"},
            {"title": "Forrest Gump", "image": "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg"},
            {"title": "Inception", "image": "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg"},
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
                release_year=fake.date_between(start_date="-20y", end_date="today"),
                image=movie_data["image"]
            )
            movies.append(movie)
            db.session.add(movie)

        # Ensure users and movies are populated before proceeding to Rentals
        print("Seeding Rentals...")

        if users and movies:  # Check if there are any users and movies
            for _ in range(15):
                # Randomly select a movie and user
                movie_id = rc([movie.id for movie in movies])  
                user_id = rc([user.id for user in users])  

                # Set a realistic due_date between 1 and 3 weeks from now
                due_date = datetime.today() + timedelta(days=randint(7, 21))  

                # Simulate rented_at and return_date (return_date will be after due_date)
                rented_at = datetime.today() - timedelta(days=randint(1, 7))  # Rented between 1 and 7 days ago
                return_date = rented_at + timedelta(days=randint(7, 14))  # Return between 7 and 14 days after rented_at

                # Debug: print selected IDs and dates
                print(f"Selected movie_id: {movie_id}, user_id: {user_id}, rented_at: {rented_at}, due_date: {due_date}, return_date: {return_date}")

                # Ensure the random movie and user ids are valid
                if movie_id is not None and user_id is not None:
                    rental = Rental(
                        user_id=user_id,
                        movie_id=movie_id,
                        rented_at=rented_at,
                        due_date=due_date,
                        return_date=return_date
                    )
                    db.session.add(rental)
                else:
                    print(f"Skipping rental creation: invalid movie_id {movie_id} or user_id {user_id}")

            db.session.commit()
            print("Seeding Rentals complete!")
        else:
            print("Error: No users or movies found. Please ensure they are seeded first.")

        # Seeding Ratings
        print("Seeding Ratings...")
        for _ in range(20):
            rating = Rating(
                rating=randint(1, 5),
                review=fake.sentence(nb_words=10),
                user_id=rc([user.id for user in users]),  # Randomly select a user
                movie_id=rc([movie.id for movie in movies])  # Randomly select a movie
            )
            db.session.add(rating)

        db.session.commit()
        print("Seeding complete!")
