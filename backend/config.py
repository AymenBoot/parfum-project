import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/perfume_shop")
    SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret_key")
