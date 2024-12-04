import bcrypt from "bcryptjs";
import prisma from "../../prisma/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ message: "User created" });
  } catch (err) {  
    console.error("Error creating user:", err); // Лог ошибки в консоль
    res.status(500).json({ error: err.message }); // Передача подробностей ошибки клиенту
  }
}