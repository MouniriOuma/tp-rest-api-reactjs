import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductServices';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [productData, setProductData] = useState({
        label: '',
        description: '',
        price: ''
    });
    const [field, setField] = useState(false);
    const { label, description, price } = productData;
    const { id } = useParams();
    const redirect = useNavigate();

    useEffect(() => {
        ProductService.getProductById(id)
            .then((res) => {
                const data = res.data;
                for (const key in data) {
                    if (data[key] === null) {
                        data[key] = "";
                    }
                }
                setProductData(data);
            })
            .catch(error => console.log(error));
    }, [id]);

    const handleData = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        ProductService.updateProduct(productData, id)
            .then(() => {
                setField(true);
                redirect('/showproduct');
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Modifier le produit</h1>
            <form style={{ margin: '0 auto', width: '50%' }} onSubmit={handleSubmit}>
                <p>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="prname">Nom du produit : </label>
                    <input style={{ width: '100%', padding: '5px' }} type="text" name="label" id="prname" value={label || ''} onChange={handleData} />
                </p>
                <p>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="prdec">Description du produit : </label>
                    <textarea style={{ width: '100%', padding: '5px' }} name="description" id="prdec" cols="30" rows="5" value={description || ''} onChange={handleData}></textarea>
                </p>
                <p>
                    <label style={{ display: 'block', marginBottom: '5px' }} htmlFor="primg">Prix du produit : </label>
                    <input style={{ width: '100%', padding: '5px' }} type="number" name="price" id="primg" value={price || ''} onChange={handleData} />
                </p>
                <p><input style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="submit" value="Mettre à jour le produit" /></p>
            </form>
        </>
    )
}

export default UpdateProduct;
