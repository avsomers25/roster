import datetime
import os
 
from flask import Flask, Response, request
from flask_mongoengine import MongoEngine
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}

CORS(app)

db = MongoEngine()
db.init_app(app)


class Roster(db.Document):
    first = db.StringField()
    last = db.StringField()
    major = db.StringField()
    gradyear = db.IntField()

#Roster.clean()
#Roster(first = "Andrew", last = "Somers", major = "CS", gradyear = 2026).save()

@app.route("/api")
def index():
    todos = Roster.objects().to_json()
    return Response(todos, mimetype="application/json", status=200)

@app.route("/add/<first_name>/<last_name>/<given_major>/<given_gradyear>")
def add(first_name, last_name, given_major, given_gradyear):
    Roster(first = str(first_name), last = str(last_name), major = str(given_major), gradyear = (given_gradyear)).save()
    return Response(status=200)

@app.route("/remove/<first_name>/<last_name>/<given_major>/<given_gradyear>")
def remove(first_name, last_name, given_major, given_gradyear):
    (Roster(first = str(first_name), last = str(last_name), major = str(given_major), gradyear = (given_gradyear))).delete()
    return Response(status=200)

@app.route("/majors")
def majors():
    majors_dict = {}
    unique = Roster.objects.distinct(field="major")
    for i in unique:
        majors_dict[i] = Roster(major = i).count()

    return majors_dict

@app.route("/gradyear")
def grads():
    grads_dict = {}
    unique = Roster.objects.distinct(field="gradyear")
    for i in unique:
        grads_dict[i] = Roster(grasyear = i).count()

    return grads_dict



if __name__ == "__main__":
    app.run(debug=True, port=5000)