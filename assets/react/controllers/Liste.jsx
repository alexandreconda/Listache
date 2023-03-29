import React, {useState, useEffect} from "react"
import { format } from 'date-fns'
import Groupe from '../../images/user_group.svg'
import Trash from '../../images/trash.svg'

const capitalize = str => {
  return (
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  );
};

function Tri() {
	return	<div>
				<table className="tri">
				<tbody>
					<tr><td>
						<input type="radio" id="triNom" name="ordreTri" defaultValue="nom" defaultChecked />
			  			<label htmlFor="triNom">Trier par nom</label>
					</td></tr>
					<tr><td>
						<input type="radio" id="triEcheance" name="ordreTri" defaultValue="echeance" />
			  			<label htmlFor="triEcheance">Trier par échéance</label>
					</td></tr>
					<tr><td>
						<input type="radio" id="triImportance" name="ordreTri" defaultValue="importance" />
			  			<label htmlFor="triImportance">Trier par importance</label>
					</td></tr>
					<tr><td>
						<input type="radio" id="triEtat" name="ordreTri" defaultValue="etat" />
			  			<label htmlFor="triEtat">Trier par état d'avancement</label>
					</td></tr>
				</tbody>
				</table>
			</div>
}

function FiltreEcheance() {
	return	<div>
				<table className="echeance">
				<tbody>
					<tr><td>A faire avant le <br/></td></tr>
					<tr><td><input type="date" id="filtreEcheance" name="echeance" defaultValue="" /></td></tr>
					<tr><td><button className="button"> Aujourd'hui </button></td></tr>
					<tr><td><button className="button"> Cette semaine </button></td></tr>
					<tr><td><button className="button"> Ce mois-ci </button></td></tr>
				</tbody>
				</table>
			</div>
}

function FiltreImportance() {
	return	<div>
				      <input type="checkbox" id="importanceTresHaute" name="importanceTresHaute" defaultChecked />
				      <label htmlFor="importanceTresHaute">Importance très haute</label>
				      <br/>
				      <input type="checkbox" id="importanceHaute" name="importanceHaute" defaultChecked />
				      <label htmlFor="importanceHaute">Importance haute</label>
				      <br/>
				      <input type="checkbox" id="importanceNormale" name="importanceNormale" defaultChecked />
				      <label htmlFor="importanceNormale">Importance normale</label>
				      <br/>
				      <input type="checkbox" id="importanceBasse" name="importanceBasse" defaultChecked />
				      <label htmlFor="importanceBasse">Importance basse</label>
				      <br/>
				      <input type="checkbox" id="importanceTresBasse" name="importanceTresBasse" defaultChecked />
				      <label htmlFor="importanceTresBasse">Importance très basse</label>
			</div>
}

function FiltreEtat() {
	return	<div>
				<input type="checkbox" id="aFaire" name="aFaire" defaultChecked />
			  	<label htmlFor="aFaire">A faire</label>
			  	<br/>
			  	<input type="checkbox" id="enCours" name="enCours" defaultChecked />
			  	<label htmlFor="enCours">En cours</label>
			  	<br/>
			  	<input type="checkbox" id="fait" name="fait" defaultChecked />
			  	<label htmlFor="fait">Fait</label>
			</div>
}

function Filtres() {
  return (
		<div className="filtres">
			<Tri />
			<FiltreEcheance />
			<FiltreImportance />
			<FiltreEtat />
		</div>
  );
}

function Tache(props) {
	const [ tacheActive, setTacheState ] = useState(false);
	const [supprimer, setSupprimer] = useState(false);

	function handleClick() {
    	setSupprimer(true);
  	}

	if (supprimer) {
	  	return <SupprimerTache tache={props.tache} />
  	}
	
	return 	<li className={"tache " + (tacheActive ? "tache-active" : "")} key={props.tache.id}> 
			<table onClick={() => setTacheState(!tacheActive)}>
			<tbody>
	    		<tr><td colSpan="2"><h2>{capitalize(props.tache.nom)}</h2></td></tr>
	    		<tr>
	    			<td className="left-panel"><img src={Groupe} className="middle"/> {capitalize(props.tache.groupe)}</td>
	    			<td className="right-panel">
	    			<ul>
	    				<li><b>Importance {props.tache.importance}</b></li>
	    				<li>{capitalize(props.tache.etat)}</li>
	    				<li>{format(new Date(props.tache.echeance), 'dd/MM/yyyy')}</li>
	    			</ul>
	    			</td>
	    		</tr>
	    		<tr>
	    			<td colSpan="2" className={tacheActive ? "" : "hidden"}> <FocusTache onClick={handleClick}/> </td>
	    		</tr>
	    	</tbody>
	    	</table>
	    	</li>
}

function Taches() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [taches, setTaches] = useState([]);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    fetch("/index.php/tache")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTaches(JSON.parse(result.taches));
        },
        // Remarque : il faut gérer les erreurs ici plutôt que dans
        // un bloc catch() afin que nous n’avalions pas les exceptions
        // dues à de véritables bugs dans les composants.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return null;
  } else 
  	{
		return (
			<ul className="listeTaches">
				{taches.map(tache => 
					<Tache tache={tache} />
				)}
			</ul>
		);
	}
}

function FocusTache({onClick}) {
	
	
	return 	<img className="centerImage" src={Trash} onClick={onClick}/>
}

function SupprimerTache(props) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [code, setCode] = useState([]);
	
	useEffect(() => {
	    	fetch(`/index.php/tache/${props.tache.id}`, {
	  			method: "DELETE"
			})
	      	.then(res => res.json())
	      	.then(
				(result) => {
		          setIsLoaded(true);
		          setCode(JSON.parse(result.code));
		        },
	        	(error) => {
	          		setIsLoaded(true);
	          		setError(error);
	        	}
	      	)
	  	}, [])
	  if (error) {
	    return <div>Erreur : {error.message}</div>;
	  } else if (!isLoaded) {
	    return null;
	  } else 
	  	{
			return null;
		}
}

function Ajouter() {
	return 	<button className="button button-important center"> Ajouter une tâche </button>
}

export default function (props) {
    return 	<div>
    			<Filtres/>
    			<h1>Liste des tâches</h1>
    			<Taches/>
    			<br/>
    			<Ajouter />
    		</div>;
}