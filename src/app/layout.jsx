// Убираем "use client" здесь
import "./globals.css";
import Navbar from "../components/Navbar";

// Экспорт метаданных на серверной стороне
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
