from flask import Blueprint, request, jsonify
from config import transactions_collection
from models import serialize_transaction
from datetime import datetime
from bson.objectid import ObjectId

routes = Blueprint("routes", __name__)

@routes.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = transactions_collection.find()
    return jsonify([serialize_transaction(t) for t in transactions]), 200

@routes.route("/transactions", methods=["POST"])
def create_transaction():
    data = request.json
    transaction = {
        "title": data["title"],
        "amount": data["amount"],
        "type": data["type"],
        "date": data.get("date", datetime.now().isoformat())
    }
    result = transactions_collection.insert_one(transaction)
    transaction["_id"] = result.inserted_id
    return jsonify(serialize_transaction(transaction)), 201

@routes.route("/transactions/<id>", methods=["DELETE"])
def delete_transaction(id):
    result = transactions_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return jsonify({"message": "Deleted"}), 200
    else:
        return jsonify({"error": "Not found"}), 404
