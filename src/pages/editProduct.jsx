import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        images: [],
        categoryId: ''
    });

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке продукта:', error);
            }
        }
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, product);
            if (response.status === 200) {
                alert('Продукт успешно обновлен!');
                navigate('/');
            }
        } catch (error) {
            console.error('Ошибка при обновлении продукта:', error);
            alert('Произошла ошибка при обновлении продукта.');
        }
    };

    return (
        <div className="edit-product">
            <h2>Редактировать продукт</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Цена:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Изображения (URL через запятую):</label>
                    <input
                        type="text"
                        name="images"
                        value={product.images.join(',')}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                images: e.target.value.split(',')
                            })
                        }
                    />
                </div>
                <div>
                    <label>Категория (ID):</label>
                    <input
                        type="number"
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
}

export default EditProduct;