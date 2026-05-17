import './Effacer.css';
function Effacer({ onClick }){
    return(
        <input type="button" value="Effacer" 
        onClick={onClick} 
        className='effacer-button'/>
    );
}

export default Effacer;

