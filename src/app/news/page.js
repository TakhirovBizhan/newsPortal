"use client";
import NewsItem from '../../components/newsItem'
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/news")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки новостей");
        }
        return response.json();
      })
      .then((data) => {
        setNewsList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Новости</h1>
      {newsList.length === 0 ? (
        <p>Нет новостей.</p>
      ) : (
        <ul>
          {newsList.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </ul>
      )}
    </div>
  );
}