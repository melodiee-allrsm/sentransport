//on importe le css
import './Recherche.css';


function Recherche({ valeur, onChange, onKeyDown}) {
return (
    <div className="recherche">
        <input
        type="text"
        className="recherche-input"
        placeholder="Rechercher une ligne (depart, arrivee)..."
        value={valeur}
        onChange={e => onChange(e)}
        onKeyDown={e => onKeyDown(e)}
        />
    </div>
);
}

//rendre le composant importable par les autres fichiers
export default Recherche;
