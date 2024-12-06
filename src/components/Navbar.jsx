"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {session ? (
          <>
            <li>
              <p>Привет, {session.user.isAdmin ? "админ" : "пользователь"}!</p>
            </li>
            {session.user.isAdmin && (
              <li>
                <Link href="/news">Управление новостями</Link>
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
              <Link href="/register">Зарегестрироваться</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
