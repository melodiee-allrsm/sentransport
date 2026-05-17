import json
#Flask crée l'app, jsonify convertit les données Python en réponse JSON. 
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger les données depuis le fichier JSON
with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)

#Route d'accueil
@app.route("/")
def accueil():
    #Message de bienvenue + liste des liens disponibles
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport !",
        "endpoints": ["/lignes", "/lignes/<id>"]
    })

#Recuperer toutes les lignes
@app.route("/lignes")
def get_lignes():
    #Renvoie toute la liste lignes au format JSON
    return jsonify(lignes)

# Recuperer une ligne precise
@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )
    
    #Dans le cas ou l'id n'existe pas on renvoie un code 404
    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvee"}), 404
    
    return jsonify(ligne)

# Lancement du serveur
# lance le serveur sur le port 5000. 
# Le mode debug recharge automatiquement 
# le serveur quand vous modifiez le code. 

if __name__ == "__main__":
    app.run(debug=True, port=5000)