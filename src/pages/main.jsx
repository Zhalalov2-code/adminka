import { useEffect, useState } from 'react';
import '../css/main.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Main() {
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.escuelajs.co/api/v1/products'
            });
            console.log(response)
            if (response.status === 200) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
        }
    }

    async function handleProductDelete(id) {
        const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот продукт?');
        if (!confirmDelete) return;

        try {
            const response = await axios({
                url: `https://api.escuelajs.co/api/v1/products/${id}`,
                method: 'delete'
            });
            console.log('delete', response);
            if (response.status === 200) {
                alert('Продукт успешно удален!');
                fetchProducts();
            }
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
            alert('Произошла ошибка при удалении продукта.');
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <div className='menu'>
                <Link to="./addProduct" className='link'>Добавить продукт +</Link>
            </div>
            <div className='content'>
                {products.length > 0 ? (
                    <div className="product-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <img src={product.images[0]} alt={product.title} className="product-image" />
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-price">${product.price}</p>
                                <p className="product-description">{product.description}</p>
                                <button
                                    className="delete-button"
                                    onClick={() => handleProductDelete(product.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Загрузка продуктов...</p>
                )}
            </div>
        </div>
    );
}

export default Main;