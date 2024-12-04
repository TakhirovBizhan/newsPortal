import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Если пользователь не авторизован и пытается получить доступ к защищенным маршрутам
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Если пользователь авторизован, но не является модератором, перенаправить на главную страницу
  if (token && !token.isAdmin && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Если пользователь авторизован, разрешить доступ
  return NextResponse.next();
}

// Указываем, какие маршруты обрабатываются middleware
export const config = {
  matcher: ["/admin/:path*"], // Применяем middleware только к маршрутам, начинающимся с /admin
};