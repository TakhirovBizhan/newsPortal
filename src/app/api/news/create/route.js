import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isAdmin) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
    });
  }

  const { title, content } = await req.json();

  try {
    const news = await prisma.news.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    return new Response(JSON.stringify(news), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}