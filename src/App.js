//On importe le fichier css
import './App.css';
import Header from './Header';

function App() { //definition de notre composant
  return (
    <div className="App">
      <Header/>
      <main className='contenu'>
        <p>Bienvenue ! Cette application vous aide à trouver 
          votre ligne de bus à Dakar.</p>
      </main>
    </div>
  );
}

//rend le composant disponible pour les autres fichiers
export default App;