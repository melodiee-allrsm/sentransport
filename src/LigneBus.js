//on importe le fichier css
import './LigneBus.css';

//on destructure les props le parent passera ces 4 valeurs
function LigneBus({ numero, depart, arrivee, arrets }) {
return (
    <div className="ligne-bus">
        <div className="ligne-numero">{numero}</div>
        <div className="ligne-info">
            <span className="ligne-trajet">
                {depart} &rarr; {arrivee} 
            </span>
            <span className="ligne-arrets">{arrets} arrets</span>
        </div>
    </div>
);
}
//on rend le fichier importable par les autres fichiers 
export default LigneBus;

