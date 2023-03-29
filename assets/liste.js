import React from "react";
import { createRoot } from 'react-dom/client';

const listerTacheDomNode = document.getElementById('listerTache');
const listerTacheRoot = createRoot(listerTacheDomNode);
listerTacheRoot.render(<ListeTaches />)

const creerTacheDomNode = document.getElementById('creerTache');
const creerTacheRoot = createRoot(creerTacheDomNode);
creerTacheRoot.render(<Test />);


const supprimerTacheDomNode = document.getElementById('supprimerTache');
const supprimerTacheRoot = createRoot(supprimerTacheDomNode);



function Test() {
  return (<table><tbody>
    		<tr><td colSpan="2"><h2>Nom</h2></td></tr>
    		<tr>
    			<td className="left-panel">Groupe</td>
    			<td className="right-panel"><ul>
    				<li><b>Importance</b></li>
    				<li>Etat</li>
    				<li>Echeance</li>
    			</ul></td></tr>
    	</tbody></table>);
}

function ListeTaches() {
  return (<table><tbody>
    		<tr><td colSpan="2"><h2>Nom</h2></td></tr>
    		<tr>
    			<td className="left-panel">Groupe</td>
    			<td className="right-panel"><ul>
    				<li><b>Importance</b></li>
    				<li>Etat</li>
    				<li>Echeance</li>
    			</ul></td></tr>
    	</tbody></table>);
}


