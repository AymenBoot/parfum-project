from app import app
from db import mongo

with app.app_context():
    mongo.db.products.update_one(
        {"id": 1},
        {"$set": {"stock": 100}}
    )
    print("Restocked Midnight Oud to 100.")
