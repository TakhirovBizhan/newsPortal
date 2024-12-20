"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    if (!result?.ok) {
      alert("Ошибка входа. Проверьте логин и пароль.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
