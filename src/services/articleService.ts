

import axios from "axios";
import type { Article } from "../types/article";

interface ArticlesHttpResponse {
  hits: Article[];
}


// HTTP-функція запиту статей
export const fetchArticles = async (topic: string): Promise<Article[]> => {
  const response = await axios.get<ArticlesHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`
  );
  // Отримання ключа з файлу .env (Змінна середовища, оточення) import.meta.env - це спеціальний об'єкт, через який Vite дає доступ до змінних оточення.
// Просто консолька щоб подивитись як працюють змінні оточення на верселі
  const myKey = import.meta.env.VITE_API_KEY;
  console.log(myKey)
  return response.data.hits;

};