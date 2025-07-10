def serialize_transaction(trx):
    return {
        "id": str(trx["_id"]),
        "title": trx["title"],
        "amount": trx["amount"],
        "type": trx["type"],
        "date": trx["date"]
    }
