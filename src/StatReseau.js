import App from "./App";

//le composant recoit une prop lignes qui est un tableau d'objet
function StatReseau({ lignes }) {

    const NbreArrets = lignes.reduce((total,ligne) => total + ligne.arrets , 0);
    
    const ligneArretMax = lignes.reduce((max, ligne) => {
        if (ligne.arrets > max.arrets) {
            return ligne;
        } else {
            return max;
        }
    }, lignes[0])

return (
    <div className="liste-lignes">  
        <span className="liste-description">
            {lignes.length} lignes disponibles<br/>
        </span>
        <span className="liste-description">
            {NbreArrets} arrets disponibles<br/>
        </span>
        <span className="liste-description">
            Ligne avec le plus d'arret : {ligneArretMax.numero}<br/>
        </span>
    </div>
);
}

//rend le composant disponible pour les autres fichiers
export default StatReseau;

