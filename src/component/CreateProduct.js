import React, { useState } from 'react';
import ProductService from '../services/ProductServices';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const initialProductState = { label: "", description: "", price: "" };
    const [productData, setProductData] = useState(initialProductState);
    const navigate = useNavigate();

    const handleData = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await ProductService.createProduct(productData);
            console.log("Produit ajouté avec succès");
            setProductData(initialProductState);
            navigate('/showproduct');
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
        }
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Créer un nouveau produit</h1>
            <form style={{ margin: '0 auto', width: '50%' }} onSubmit={handleSubmit}>
                <p>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="prname">Nom du produit : </label>
                    <input style={{ width: '100%', padding: '5px' }} type="text" name="label" id="prname" value={productData.label} onChange={handleData} />
                </p>
                <p>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="prdec">Description du produit : </label>
                    <textarea style={{ width: '100%', padding: '5px' }} name="description" id="description" cols="30" rows="5" value={productData.description} onChange={handleData}></textarea>
                </p>
                <p>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="primg">Prix du produit : </label>
                    <input style={{ width: '100%', padding: '5px' }} type="number" name="price" id="prprice" value={productData.price} onChange={handleData} />
                </p>
                <p><input style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="submit" value="Ajouter le produit" /></p>
            </form>
        </>
    )
}

export default CreateProduct;
