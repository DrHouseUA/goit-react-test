// src/components/App.tsx

// Loader який порекомендували в навчанні
import { Audio } from "react-loader-spinner";

import { useState } from "react";
import Product from "./Product/Product";
import Button from "./Button/Button";
import OrderForm from "./OrederForm/OrderForm";
import SearchForm from "./SearchForm/SearchForm";
import type { Article } from "../types/article";
import ArticleList from "./ArticleList/ArticleList";
import { fetchArticles } from "../services/articleService";
import Modal from "./Modal/Modal";

export default function App() {
  //Оголошуємо стан для запиту на бекенд
  const [articles, setArticles] = useState<Article[]>([]);
  //Оголошуємо стан для лоадера
  const [isLoading, setIsLoading] = useState(false);
  //Оголошуємо стан для помилки
  const [isError, setIsError] = useState(false);
  //Оголошуємо стан для модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    console.log("Name: ", username);
  };

  const handleOrder = (data: string) => {
    console.log("Order received from", data);
  };

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      //  Скидаємо стан помилки в false перед кожним запитом
      setIsError(false);
      //  Використовуємо HTTP-функцію
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      //  Встановлюємо стан isError в true
      setIsError(true);
    } finally {
      // Встановлюємо стан isLoading в false
      // після будь якого результату запиту
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Best selling</h1>
      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
        price={10.99}
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
        price={14.29}
      />
      <Button variant="primary" text="Login" />
      <Button variant="secondary" text="Follow" />
      <form action={handleSubmit}>
        <input type="text" name="username" defaultValue="Jhon Doe" />
        <button type="submit">Submit</button>
      </form>
      <OrderForm onSubmit={handleOrder}></OrderForm>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      )}
      {/*  Використовуємо стан isError щоб показати помилку */}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
      <button onClick={openModal}>Open modal</button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Custom Modal Content</h2>
          <p>This is a reusable modal with dynamic content.</p>
        </Modal>
      )}
    </>
  );
}
