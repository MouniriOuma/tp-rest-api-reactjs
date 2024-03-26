import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/ProductServices';

const ShowProduct = () => {
    // Définir l'état initial pour les produits
    const [products, setProducts] = useState([]);

    // Fonction pour récupérer les données des produits depuis le serveur
    const getProductData = () => {
        ProductService.getProducts()
            .then(res => setProducts(res.data))
            .catch(error => console.error("Erreur lors de la récupération des produits :", error));
    }

    // Utiliser useEffect pour charger les données des produits au chargement du composant
    useEffect(() => {
        getProductData();
    }, []);

    // Fonction pour supprimer un produit
    const handleDelete = (id) => {
        ProductService.deleteProduct(id)
            .then(() => {
                getProductData(); // Rafraîchir la liste des produits après la suppression
            })
            .catch(error => console.error("Erreur lors de la suppression du produit :", error));
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Liste des produits</h1>
            <Link to={"/"} style={{ display: 'block', margin: '10px 0', textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '10px', textAlign: 'center' }}>
                Ajouter d'autres produits
            </Link>
            <table style={{ margin: 'auto', borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Nom du produit</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Description du produit</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Prix du produit</th>
                        <th style={{ border: '1px solid black', padding: '8px' }} colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{item.label}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{item.description}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{item.price} MAD</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <Link to={`/updateproduct/${item.id}`} style={{ textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '5px 10px', borderRadius: '5px', textAlign: 'center' }}>
                                    Modifier
                                </Link>
                            </td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowProduct;
