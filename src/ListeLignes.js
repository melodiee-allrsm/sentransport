//on importe le fichier css et celui contenant le composant LigneBus
import LigneBus from './LigneBus';
import './ListeLignes.css';

//le composant recoit une prop lignes qui est un tableau d'objet
function ListeLignes({ lignes }) {
return (
    <div className="liste-lignes">
        <h2 className="liste-titre">Lignes Dakar Dem Dikk</h2>
        <p className="liste-description">
            {lignes.length} lignes disponibles
        </p>
        {lignes.map(ligne => (
            <LigneBus
                key={ligne.id}
                numero={ligne.numero}
                depart={ligne.depart}
                arrivee={ligne.arrivee}
                arrets={ligne.arrets}
            />
        ))}
    </div>
);
}

//rend le composant disponible pour les autres fichiers
export default ListeLignes;


//Dans ce code pour chaque ligne on appelle le composant LignesBus pour afficher ces details
// key={ligne.id} la prop key est obligatoire dans un map(). 
//Elle permet à React d'identifier chaque élément de manière unique
