#!/usr/bin/env python3

from flask import request, make_response, abort
from flask_restful import Resource
from sqlalchemy import func
from config import app, db, api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from models import db, Member, Workout, Exercise, Goal

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# Member Resource
class MemberResource(Resource):
    def get(self):
        members = Member.query.all()
        return [member.to_dict() for member in members], 200

    def post(self):
        data = request.json
        member = Member(
            name=data['name'],
            email=data['email'],
            age=data.get('age'),
            weight=data.get('weight'),
            height=data.get('height')
        )
        db.session.add(member)
        db.session.commit()
        return member.to_dict(), 201

    def patch(self, member_id):
        data = request.json
        member = Member.query.get(member_id)
        if member:
            if 'name' in data:
                member.name = data['name']
            if 'email' in data:
                member.email = data['email']
            if 'age' in data:
                member.age = data['age']
            if 'weight' in data:
                member.weight = data['weight']
            if 'height' in data:
                member.height = data['height']
            db.session.commit()
            return member.to_dict(), 200
        return {'message': 'Member not found'}, 404

    def delete(self, member_id):
        member = Member.query.get(member_id)
        if member:
            db.session.delete(member)
            db.session.commit()
            return {'message': 'Member deleted'}, 200
        return {'message': 'Member not found'}, 404

# Member Resource
class MemberById(Resource):
    def get(self, id):
        # Query for a single member
        member = Member.query.filter(Member.id == id).first()
        
        # Check if the member exists
        if member:
            return make_response(member.to_dict(), 200)
        else:
            return make_response({"error": "Member not found"}, 404)



# Workout Resource
class WorkoutResource(Resource):
    def get(self):
        workouts = Workout.query.all()
        return [workout.to_dict() for workout in workouts], 200

    def post(self):
        data = request.json
        workout = Workout(
            name=data['name'],
            description=data.get('description')
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict(), 201

    def patch(self, workout_id):
        data = request.json
        workout = Workout.query.get(workout_id)
        if workout:
            if 'name' in data:
                workout.name = data['name']
            if 'description' in data:
                workout.description = data['description']
            db.session.commit()
            return workout.to_dict(), 200
        return {'message': 'Workout not found'}, 404

    def delete(self, workout_id):
        workout = Workout.query.get(workout_id)
        if workout:
            db.session.delete(workout)
            db.session.commit()
            return {'message': 'Workout deleted'}, 200
        return {'message': 'Workout not found'}, 404


# Exercise Resource
class ExerciseResource(Resource):
    def get(self):
        exercises = Exercise.query.all()
        return [exercise.to_dict() for exercise in exercises], 200

    def post(self):
        data = request.json
        exercise = Exercise(
            name=data['name'],
            sets=data.get('sets'),
            reps=data.get('reps'),
            weight=data.get('weight'),
            duration=data.get('duration'),
            workout_id=data['workout_id']
        )
        db.session.add(exercise)
        db.session.commit()
        return exercise.to_dict(), 201

    def patch(self, exercise_id):
        data = request.json
        exercise = Exercise.query.get(exercise_id)
        if exercise:
            if 'name' in data:
                exercise.name = data['name']
            if 'sets' in data:
                exercise.sets = data['sets']
            if 'reps' in data:
                exercise.reps = data['reps']
            if 'weight' in data:
                exercise.weight = data['weight']
            if 'duration' in data:
                exercise.duration = data['duration']
            if 'workout_id' in data:
                exercise.workout_id = data['workout_id']
            db.session.commit()
            return exercise.to_dict(), 200
        return {'message': 'Exercise not found'}, 404

    def delete(self, exercise_id):
        exercise = Exercise.query.get(exercise_id)
        if exercise:
            db.session.delete(exercise)
            db.session.commit()
            return {'message': 'Exercise deleted'}, 200
        return {'message': 'Exercise not found'}, 404


# Goal Resource
class GoalResource(Resource):
    def get(self):
        goals = Goal.query.all()
        return [goal.to_dict() for goal in goals], 200

    def post(self):
        data = request.json
        goal = Goal(
            goal_type=data['goal_type'],
            target_value=data['target_value'],
            current_value=data.get('current_value'),
            member_id=data['member_id']
        )
        db.session.add(goal)
        db.session.commit()
        return goal.to_dict(), 201

    def patch(self, goal_id):
        data = request.json
        goal = Goal.query.get(goal_id)
        if goal:
            if 'goal_type' in data:
                goal.goal_type = data['goal_type']
            if 'target_value' in data:
                goal.target_value = data['target_value']
            if 'current_value' in data:
                goal.current_value = data['current_value']
            if 'member_id' in data:
                goal.member_id = data['member_id']
            db.session.commit()
            return goal.to_dict(), 200
        return {'message': 'Goal not found'}, 404

    def delete(self, goal_id):
        goal = Goal.query.get(goal_id)
        if goal:
            db.session.delete(goal)
            db.session.commit()
            return {'message': 'Goal deleted'}, 200
        return {'message': 'Goal not found'}, 404


# Register resources with routes
api.add_resource(MemberResource, '/members')
api.add_resource(MemberById, "/members/<int:id>")

api.add_resource(WorkoutResource, '/workouts', '/workouts/<int:workout_id>')
api.add_resource(ExerciseResource, '/exercises', '/exercises/<int:exercise_id>')
api.add_resource(GoalResource, '/goals', '/goals/<int:goal_id>')




if __name__ == '__main__':
    app.run(port=5555, debug=True)