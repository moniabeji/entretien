from flask import Flask, request, jsonify
from flask_cors import CORS
from src.repositories.connexion import Session, init_db

from src.repositories import mission_repository
from src.controllers import mission_controller, delivery_controller, moto_controller, address_controller

app = Flask(__name__)
CORS(app)
init_db()

app.route("/")
def hello():
    return "Hello World!"


@app.route("/missions-today", methods=['GET'])
def get_missions_today():
    session = Session()
    nums = mission_repository.get_missions_today(session)
    print(nums)
    session.close()
    return jsonify({"nums": nums})


@app.route("/missions-after", methods=['GET'])
def get_missions_after():
    session = Session()
    nums = mission_repository.get_missions_after(session)
    session.close()
    return jsonify({"nums": nums})


@app.route("/generate-mission", methods=['POST'])
def generate_mission():
    session = Session()
    mission = request.get_json()
    mission_repository.create_mission(session, mission)
    session.close()
    return jsonify({"status": True})


@app.route("/deliveries", methods=['GET'])
def get_deliveries():
    session = Session()
    deliveries = delivery_controller.get_deliveries_schema(session)
    session.close()
    print(deliveries)
    return jsonify(deliveries)


@app.route("/motos", methods=['GET'])
def get_motos():
    session = Session()
    motos = moto_controller.get_motos_schema(session)
    session.close()
    return jsonify(motos)


@app.route("/addresses", methods=['GET'])
def get_addresses():
    session = Session()
    addresses = address_controller.get_addresses_schema(session)
    session.close()
    return jsonify(addresses)


@app.route("/missions", methods=['GET'])
def get_missions():
    session = Session()
    missions = mission_controller.get_mission_schema(session)
    print(missions)
    session.close()
    return jsonify(missions)


if __name__ == '__main__':
    app.run(port=5001, host='0.0.0.0')
