import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { content, newsId } = await req.json();

  try {
    const comment = await prisma.comments.create({
      data: {
        content,
        newsId,
        authorId: session.user.id,
        status: "Pending", // Комментарий на модерации
      },
    });

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}