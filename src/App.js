//On importe les differents composants et le useState
import { useState , useEffect } from 'react';
import './App.css';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';
import Effacer from './Effacer';

function App() { //definition du composant

  // 1. États pour les données et l'interface
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [compteurRecherche, setCompteurRecherche] = useState(0);

  // 2. Chargement des données au démarrage (Appel API Flask)
  useEffect(() => {
    fetch("http://localhost:5000/lignes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setLignes(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }, []);

  // Filtrer les lignes selon le texte tape
  const lignesFiltrees = lignes.filter(l =>
  l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
  l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
  l.numero.includes(recherche)
  );


  //Fonction pour selectionner ou deselectionner une ligne
  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
      setLigneSelectionnee(null);
    // re-clic = deselectioner
    } else {
      setLigneSelectionnee(ligne); // premier clic = selectionner
    }
  }

  //Fonction qui gere le compteur et le target.value
  function buttonRecherche(e) {
    setRecherche(e.target.value);
  }

  //Fonction qui incremente le compteur de recherche apres validation
  function CompteurValidation(e) {
    if (e.key === "Enter") {
      setCompteurRecherche(compteurRecherche + 1);
    }
  }

  const ResultatRecherche = (lignesFiltrees.length === 0 ?
    'Aucune ligne trouvée' : 
    `${lignesFiltrees.length} ligne${lignesFiltrees.length > 1 ? 's' :''} 
    trouvée${lignesFiltrees.length > 1 ? 's' : ''}`
  )
  
  // 1. Écran de chargement
  if (chargement) {
    return (
      <div className="status-message loading">
        <p>Chargement des lignes...</p>
      </div>
    );
  }

  // 2. Écran d'erreur
  if (erreur) {
    return (
      <div className="status-message error" style={{ color: 'red' }}>
        <p>Impossible de charger les lignes.</p>
        <p><strong>Erreur :</strong> {erreur}</p>
        <p>Vérifiez que le serveur Flask est lancé (<code>python api/app.py</code>).</p>
      </div>
    );
  }
  
  return (
    <div className="App">
      <Header/>

      <main className="contenu">

      <div className='button-recherche'>
        <Recherche valeur={recherche} onChange={buttonRecherche} onKeyDown={CompteurValidation}/>
        <Effacer onClick={() =>setRecherche("")}/>
      </div>

      <p>Vous avez {compteurRecherche} recherche{compteurRecherche > 1 ? 's' : ''}</p>
      
        <p className="resultat-recherche">{ResultatRecherche}</p>
      
        {lignesFiltrees.map(ligne => (
          <LigneBus
            key={ligne.id}
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
            estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
            onClick={() => handleClickLigne(ligne)}
          />
        ))}
        { ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}
      </main>
      <Footer />
    </div>
  );
}

//rend le composant disponible pour les autres fichiers
export default App;






