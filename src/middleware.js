import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Если пользователь не авторизован, перенаправляем на страницу входа для защищённых маршрутов
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/news"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Если пользователь авторизован, но не является администратором, запрещаем доступ к /admin
  if (token && !token.isAdmin && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Разрешить доступ ко всем остальным маршрутам
  return NextResponse.next();
}

// Указываем маршруты, которые обрабатываются middleware
export const config = {
  matcher: ["/admin/:path*", "/news/:path*"],
};