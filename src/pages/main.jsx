import { useEffect, useState } from 'react';
import '../css/main.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Main() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    async function fetchProducts() {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.escuelajs.co/api/v1/products'
            });
            console.log('Продукты загружены:', response.data);
            if (response.status === 200) {
                setProducts(response.data);
                setFilteredProducts(response.data);
            }
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
        }
    }

    async function fetchCategories() {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.escuelajs.co/api/v1/categories'
            });
            console.log('Категории загружены:', response.data);
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error('Ошибка при загрузке категорий:', error);
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
        let filtered = products;

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.category.id === parseInt(selectedCategory)
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    return (
        <div className="container">
            <div className='menu'>
                <Link to="./addProduct" className='link'>Добавить продукт +</Link>
                <input
                    className='inSearch'
                    type="text"
                    placeholder='Поиск'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className='category-select'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Все категории</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='content'>
                {filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <img src={product.images[0]} alt={product.title} className="product-image" />
                                <h5 className="product-title">{product.title}</h5>
                                <p className="product-price">${product.price}</p>
                                <p className="product-description">{product.description}</p>
                                <div className="card-buttons">
                                    <button
                                        className="delete-button"
                                        onClick={() => handleProductDelete(product.id)}
                                    >
                                        Удалить
                                    </button>
                                    <Link to={`/editProduct/${product.id}`} className="edit-button">
                                        Изменить
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Ничего не найдено.</p>
                )}
            </div>
        </div>
    );
}

export default Main;