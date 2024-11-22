#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker
import random

# Local imports
from app import app
from models import db, Member, Workout, Exercise, Goal

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Drop existing tables and create new ones
        db.drop_all()
        db.create_all()

        # Seeding Members
        print("Seeding Members...")
        members = []
        for _ in range(10):
            member = Member(
                name=fake.name(),
                email=fake.email(),
                age=randint(18, 65),
                weight=round(randint(45, 100) + randint(0, 99) / 100, 2),  # Random weight in kg
                height=round(randint(150, 200) + randint(0, 99) / 100, 2)  # Random height in cm
            )
            members.append(member)
            db.session.add(member)

        # Seeding Workouts
        print("Seeding Workouts...")
        workout_names = ["Running", "Strength Training", "Yoga", "HIIT", "Cycling", "Swimming", "Pilates"]
        workouts = []
        for name in workout_names:
            workout = Workout(
                name=name,
                description=f"A great workout for {name.lower()} enthusiasts.",
            )
            workouts.append(workout)
            db.session.add(workout)

        # Seeding Exercises
        print("Seeding Exercises...")
        exercise_names = ["Push-ups", "Squats", "Lunges", "Plank", "Jumping Jacks", "Burpees", "Deadlifts"]
        exercises = []
        for workout in workouts:
            for exercise_name in exercise_names:
                exercise = Exercise(
                    name=exercise_name,  # Add exercise name here
                    workout_id=workout.id,
                    sets=randint(3, 5),
                    reps=randint(10, 20),
                    weight=round(randint(20, 100) + randint(0, 99) / 100, 2),  # Random weight for exercises
                    duration=round(randint(10, 30) + randint(0, 59) / 60, 2)  # Duration in minutes
                )
                exercises.append(exercise)
                db.session.add(exercise)


        # Seeding Goals
        print("Seeding Goals...")
        for member in members:
            goal_type = rc(["Weight Loss", "Strength", "Endurance", "Flexibility"])
            target_value = round(randint(50, 100) + randint(0, 99) / 100, 2)  # Target weight, strength level, etc.
            current_value = round(randint(45, 99) + randint(0, 99) / 100, 2)  # Current value to track progress

            goal = Goal(
                goal_type=goal_type,
                target_value=target_value,
                current_value=current_value,
                member_id=member.id
            )
            db.session.add(goal)

        # Ensure members and workouts are populated before proceeding to adding workouts to members
        print("Assigning Workouts to Members...")
        for member in members:
            # Randomly assign workouts to members
            assigned_workouts = random.sample(workouts, randint(1, 3))  # Assign 1 to 3 random workouts
            for workout in assigned_workouts:
                member.workouts.append(workout)


        db.session.commit()
        print("Seeding complete!")
