"""Flask app for Cupcakes"""

from flask import Flask, request, jsonify
from models import *

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///cupcakes"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "oh-so-secret"
app.app_context().push()

connect_db(app)

def serialize_cupcake(cupcake):
    """Serialize a dessert SQLAlchemy obj to dictionary"""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image
    }

@app.route("/api/cupcakes")
def get_cupcakes():
    """Get data about all cupcakes. Respond with JSON"""

    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcake(c) for c in cupcakes]

    return jsonify(cupcakes=serialized)