from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import func
from config import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


# Member model (previously User)
class Member(db.Model, SerializerMixin):
    __tablename__ = 'members'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    height = db.Column(db.Float)

    # Many-to-many relationship with Workout (members can have many workouts)
    workouts = db.relationship('Workout', secondary='member_workout', back_populates='members')
    # One-to-many relationship with Goal (members can have many goals)
    goals = db.relationship('Goal', back_populates='member')

    serialize_rules = ('-workouts', '-goals')  # Exclude these relationships from serialization

    #Validations

    def __repr__(self):
        return f'<Member {self.id}: {self.name}>'




# Workout model
class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(250))

    # Many-to-many relationship with Member (workouts can belong to many members)
    members = db.relationship('Member', secondary='member_workout', back_populates='workouts')
    # One-to-many relationship with Exercise (workouts can have many exercises)
    exercises = db.relationship('Exercise', back_populates='workout')

    serialize_rules = ('-members', '-exercises')  # Exclude these relationships from serialization

    #Validations


    def __repr__(self):
        return f'<Workout {self.id}: {self.name}>'


# Member-Workout many-to-many association table
class MemberWorkout(db.Model):
    __tablename__ = 'member_workout'
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'), primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), primary_key=True)



# Exercise model
class Exercise(db.Model, SerializerMixin):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    weight = db.Column(db.Float)
    duration = db.Column(db.Float)

    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    workout = db.relationship('Workout', back_populates='exercises')

    serialize_rules = ('-workout',)  # Exclude the relationship from serialization


    #Validations


    def __repr__(self):
        return f'<Exercise {self.id}: {self.name}>'


# Goal model
class Goal(db.Model, SerializerMixin):
    __tablename__ = 'goals'
    id = db.Column(db.Integer, primary_key=True)
    goal_type = db.Column(db.String(50), nullable=False)  # e.g., 'weight', 'reps', 'duration'
    target_value = db.Column(db.Float)
    current_value = db.Column(db.Float)

    member_id = db.Column(db.Integer, db.ForeignKey('members.id'))
    member = db.relationship('Member', back_populates='goals')

    serialize_rules = ('-member',)  # Exclude the relationship from serialization



    #Validations


    def __repr__(self):
        return f'<Goal {self.id}: {self.goal_type}>'