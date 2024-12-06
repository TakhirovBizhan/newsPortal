"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  // Проверяем, загружается ли сессия
  if (status === "loading") {
    return <nav>Загрузка...</nav>;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Главная</Link>
        </li>
        {session ? (
          <>
            <li>
              <p>Привет, {session.user.isAdmin ? "админ" : "пользователь"}!</p>
            </li>
            <li>
              <Link href="/news">Новости</Link>
            </li>
            {session.user.isAdmin && (
              <li>
                <Link href="/admin">Админ-панель</Link>
              </li>
            )}
            <li>
              <button onClick={() => signOut()}>Выйти</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Войти</Link>
            </li>
            <li>
              <Link href="/register">Регистрация</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
