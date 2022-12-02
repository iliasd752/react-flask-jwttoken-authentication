"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    print(email, password)
    user = User.query.filter_by(email=email).first()
    if email != user.email or password != user.password:
        return jsonify({"msg": "Wrong email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():

    email = get_jwt_identity()
    dictionnary = {
        "message": "Hello World" + email
    }
    return jsonify(dictionnary)

@api.route("/signup", methods=["POST"])
def create_user():

    request_body = request.json
    print(request_body)
    user = User(request_body["email"], request_body["password"], True)
    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize()), 200