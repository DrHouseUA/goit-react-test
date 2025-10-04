// src/components/App.tsx

import Product from "./Product";
import Button from "./Button";
import OrderForm from "./OrederForm/OrderForm";
import SearchForm from "./SearchForm/SearchForm";
import axios from "axios";

interface Article {
  objectID: string;
  title: string;
  url: string;
}

interface ArticlesHttpResponse {
  hits: Article[];
}

export default function App() {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    console.log("Name: ", username);
  };

  const handleOrder = (data: string) => {
    console.log("Order received from", data);
  };

  const handleSearch = async (topic: string) => {
    const response = await axios.get<ArticlesHttpResponse>(
      `https://hn.algolia.com/api/v1/search?query=${topic}`
    );
    console.log(response.data);
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
    </>
  );
}
