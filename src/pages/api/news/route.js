import prisma from "../../prisma/client";


export async function GET() {
  try {
    const news = await prisma.news.findMany({
      include: { author: true }, // Включаем данные об авторе
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}