import { useState } from "react";
import axios from "axios";
import "../css/addProduct.css";
import { Link } from "react-router-dom";

function AddProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState('');
    const [message, setMessage] = useState('');

    async function addProduct(e) {
        e.preventDefault();

        try {
            const response = await axios({
                method: 'post',
                url: 'https://api.escuelajs.co/api/v1/products/',
                data: {
                    title: title,
                    price: parseFloat(price),
                    description: description,
                    categoryId: parseInt(category),
                    images: [images]
                }
            });

            if (response.status === 201) {
                setMessage('Продукт успешно добавлен!');
                setTitle('');
                setPrice('');
                setDescription('');
                setCategory('');
                setImages('');
            } else {
                setMessage('Произошла ошибка при добавлении продукта.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setMessage('Произошла ошибка при отправке данных.');
        }
    }

    return (
        <div className="add-product-container">
            <h1>Добавить продукт</h1>
            {message && (
                <div className={`message ${message.includes('ошибка') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={addProduct}>
                <div className="form-group">
                    <label>Название:</label>
                    <input
                        type="text"
                        placeholder="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Цена:</label>
                    <input
                        type="number"
                        placeholder="Цена"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Описание:</label>
                    <textarea
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ID категории:</label>
                    <input
                        type="number"
                        placeholder="ID категории"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ссылка на изображение:</label>
                    <input
                        type="text"
                        placeholder="Ссылка на изображение"
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Добавить продукт</button>
            </form>
            <Link to={"/"} className="link">Назад</Link>
        </div>
    );
}

export default AddProduct;