from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from db import mongo, init_db
from bson.objectid import ObjectId

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for all domains (for development)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize DB
init_db(app)

# Initialize DB
init_db(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running"})

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        # Fetch all products
        products = list(mongo.db.products.find())
        
        # Convert ObjectId to string for JSON serialization
        for product in products:
            product['_id'] = str(product['_id'])
            
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    try:
        product = mongo.db.products.find_one({"id": id})
        if product:
            product['_id'] = str(product['_id'])
            return jsonify(product), 200
        return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/category/<string:category>', methods=['GET'])
def get_products_by_category(category):
    try:
        products = list(mongo.db.products.find({"category": category}))
        for product in products:
            product['_id'] = str(product['_id'])
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        items = data.get('items', [])
        
        for item in items:
            product_id = item.get('id')
            quantity = item.get('quantity', 1)
            
            # Decrement stock
            mongo.db.products.update_one(
                {"id": product_id},
                {"$inc": {"stock": -quantity}}
            )
            
        return jsonify({"message": "Order processed successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
