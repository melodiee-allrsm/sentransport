import json
#Flask crée l'app, jsonify convertit les données Python en réponse JSON. 
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request

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

#Afficher la liste des arrets
@app.route("/arrets")
def get_arrets():

    arrets = set()
    for ligne in lignes :
        arrets.update(ligne["listeArrets"])

    return jsonify(list(arrets))

# Afficher les statistiques
@app.route("/stats")
def statistiques():
    # Nombre de lignes
    nbre_lignes = len(lignes)

    # Nombre d'arrets
    nbre_arrets = 0
    for ligne in lignes :
        nbre_arrets = nbre_arrets + len(ligne["listeArrets"])

    # Numero de la ligne ayant le plus d'arrets
    ligne_Plus_arrets = lignes[0]
    for ligne in lignes :
        if len(ligne["listeArrets"]) > len(ligne_Plus_arrets["listeArrets"]):
            ligne_Plus_arrets = ligne
        
    
    return jsonify({
        "Nombre total de lignes": nbre_lignes,
        "Nombre total d'arrets": nbre_arrets,
        "Ligne avec le plus grand nombre d'arrets": ligne_Plus_arrets["id"]
    })

# Filtrer les lignes sont le depart et l'arrivee contient le parametre q
@app.route("/lignes/recherche")
def recherche():
    q = request.args.get("q","")
    ligne_parametre_q = []

    for ligne in lignes :
        if q in ligne['depart'] or q in ligne['arrivee'] :
            ligne_parametre_q.append(ligne)

    return jsonify(ligne_parametre_q)

# Lancement du serveur
# lance le serveur sur le port 5000. 
# Le mode debug recharge automatiquement 
# le serveur quand vous modifiez le code. 

if __name__ == "__main__":
    app.run(debug=True, port=5000)