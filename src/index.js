// Importer les dépendances nécessaires
import React from 'react';
import ReactDOM from 'react-dom/client'; // Cet import semble inhabituel. Habituellement, il est importé comme `import ReactDOM from 'react-dom';`
import './index.css'; // Importer les styles CSS
import App from './App'; // Importer le composant principal de l'application
import reportWebVitals from './reportWebVitals'; // Importer la fonction pour rapporter les indicateurs web
import { BrowserRouter } from "react-router-dom"; // Importer BrowserRouter pour le routage

// Créer un nœud React DOM racine et rendre le composant principal de l'application dans un BrowserRouter
const root = ReactDOM.createRoot(document.getElementById('root')); // Création d'un nœud React DOM racine
root.render(
    <BrowserRouter>
        <App /> {/* Rendre le composant principal de l'application enveloppé dans BrowserRouter */}
    </BrowserRouter>
);

reportWebVitals(); // Rapporter les indicateurs web, probablement à des fins de suivi des performances
