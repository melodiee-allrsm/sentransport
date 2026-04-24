//On importe le fichier css 
import './Header.css';

function Header(){ //definition du composant
    return(
        <header className='header'>
            <h1 className='header-titre'>SenTransport</h1>
            <p className='header-soustitre'>
                Votre guide du transport en commun à Dakar
            </p>
        </header>
    );
}

//rend le composant disponible pour les autres fichiers
export default Header;
