import prisma from "../../../../prisma/client";

export async function POST(req) {
  try {
    const body = await req.json();

    const newComment = await prisma.comment.create({
      data: {
        content: body.content,
        newsId: body.newsId,
      },
    });

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response(JSON.stringify({ error: "Failed to create comment" }), {
      status: 500,
    });
  }
}