"use client";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <SessionProvider>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {session ? (
            <>
              <li>
                <p>
                  Привет, {session.user.isAdmin ? "админ" : "пользователь"}!
                </p>
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
            <li>
              <Link href="/login">Войти</Link>
            </li>
          )}
        </ul>
      </nav>
    </SessionProvider>
  );
}
