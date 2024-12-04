import { requireAdmin } from "@/utils/auth";

export const getServerSideProps = requireAdmin;

export default function CreateNewsPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    const response = await fetch("/api/news/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Новость успешно создана!");
      event.target.reset();
    } else {
      alert("Ошибка при создании новости.");
    }
  };

  return (
    <div>
      <h1>Создать новость</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Заголовок:</label>
          <input type="text" name="title" required />
        </div>
        <div>
          <label>Контент:</label>
          <textarea name="content" required></textarea>
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}