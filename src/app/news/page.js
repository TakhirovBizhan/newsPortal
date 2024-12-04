"use client";

import { useEffect, useState } from "react";

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then((response) => response.json())
      .then((data) => setNewsList(data))
      .catch((error) => console.error("Ошибка загрузки новостей", error));
  }, []);

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

function NewsItem({ news }) {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const commentData = {
      content: comment,
      newsId: news.id,
    };

    const response = await fetch("/api/comments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      alert("Комментарий отправлен на модерацию.");
      setComment(""); // Очистить поле комментария
    } else {
      alert("Ошибка при добавлении комментария.");
    }
  };

  return (
    <li>
      <h2>{news.title}</h2>
      <p>{news.content}</p>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Ваш комментарий..."
          required
        />
        <button type="submit">Отправить</button>
      </form>
    </li>
  );
}