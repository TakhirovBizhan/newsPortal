import { useState } from "react";

export default function NewsItem({ news }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const commentData = {
        content: comment,
        newsId: news.id,
      };

      const response = await fetch("/api/comments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении комментария.");
      }

      alert("Комментарий отправлен на модерацию.");
      setComment("");
    } catch (err) {
      console.error(err);
      setError(err.message);
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </li>
  );
}
