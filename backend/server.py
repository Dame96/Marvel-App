# py -m venv venv | python3 -m venv venv - create virtual env
# venv\Scripts\activate | source venv/bin/activate - activate virtual env 
# pip install -r requirements.txt

from flask import Flask, request, jsonify
from sqlalchemy import String, Enum, Text, Integer, select, create_engine, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from flask_sqlalchemy import SQLAlchemy
from marshmallow import ValidationError, fields
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)


# MySQL database configuration 
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Dametech1!@localhost/marvel'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


#Creating our Base Model
class Base(DeclarativeBase):
    pass

# Initialize SQLAlchemy and Marshmallow
db = SQLAlchemy(model_class=Base)
db.init_app(app)
ma = Marshmallow(app)
CORS(app)

class Character(Base):
    __tablename__ = "characters"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    alias: Mapped[str] = mapped_column(String(100), nullable=False)
    alignment: Mapped[str] = mapped_column(Enum('hero', 'villain', name="alignment_enum"), nullable=False)
    powers: Mapped[str] = mapped_column(Text, nullable=False)
    image_url: Mapped[str] = mapped_column(String(255), nullable=False)
		
	
# Character Schema

class CharacterSchema(ma.Schema):
    id = fields.Int(required=False)
    name = fields.String(required=True)
    alias = fields.String(required=True)
    alignment = fields.String(required=True)
    powers = fields.String(required=True)
    image_url = fields.String(required=True)

    class Meta:
        fields = ("id", "name", "alias", "alignment", "powers", "image_url")
        
# Initialize Schemas
character_schema = CharacterSchema()
characters_schema = CharacterSchema(many=True) #Can serialize many Trainer objects (a list of them)


def create_database():
    root_engine = create_engine("mysql+mysqlconnector://root:Dametech1!@localhost")  # No database specified
    with root_engine.connect() as connection:
        connection.execute(text("CREATE DATABASE IF NOT EXISTS marvel"))


# Without the app context, Flask wouldn't know which app's configuration to use.     
with app.app_context():
    create_database()
    db.create_all() # uses the schema to create the database tables  
    
    
########### Flask Endpoints ##############

@app.route('/characters', methods=['GET'])
def get_characters():
    query = select(Character)
    characters = db.session.execute(query).scalars().all()

    return characters_schema.jsonify(characters), 200


@app.route('/characters/<int:id>', methods=['GET'])
def get_character(id):
    character = db.session.get(Character, id)
    
    return character_schema.jsonify(character), 200


@app.route('/characters', methods=['POST'])
def create_character():
    try:
        character_data = character_schema.load(request.json)
        
    except ValidationError as e:
        return jsonify(e.messages), 400
    
    new_character = Character(name=character_data['name'], 
                              alias=character_data['alias'], 
                              alignment=character_data['alignment'], 
                              powers=character_data['powers'], 
                              image_url=character_data['image_url'])
    
    db.session.add(new_character)
    db.session.commit()

    return character_schema.jsonify(new_character), 201


@app.route('/characters/<int:id>', methods=['PUT'])
def update_character(id):
    character = db.session.get(Character, id)

    if not character:
        return jsonify({"message": "Invalid character id"}), 400

    try:
        character_data = character_schema.load(request.json)
    except ValidationError as e:
        return jsonify(e.messages), 400

    character.name = character_data['name']
    character.alias = character_data['alias']
    character.alignment = character_data['alignment']
    character.powers = character_data['powers']
    character.image_url = character_data['image_url']

    db.session.commit()
    
    return character_schema.jsonify(character), 200


@app.route('/characters/<int:id>', methods=['DELETE'])
def delete_character(id):
    character = db.session.get(Character, id)

    if not character:
        return jsonify({"message": "Invalid character id"}), 400

    db.session.delete(character)
    db.session.commit()
    
    return jsonify({"message": "Character successfully deleted"}), 200


app.run(debug=True) # runs flask server