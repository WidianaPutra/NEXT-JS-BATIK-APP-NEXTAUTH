import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if (req.method !== "POST") {
    // Process a POST request
    return Response.json({ status: 405, message: "Method not allowed" });
  }

  const data = await req.json();

  if (!(data.username || data.email || data.password)) {
    return Response.json({ status: 400, message: "All fields are required" });
  }

  try {
    const isExistUser = await prisma.users.findUnique({
      where: { email: data.email },
    });

    if (isExistUser) {
      return Response.json({ status: 409, message: "Email already exists" });
    }
    const hashedPassword = await hash(data.password, 10);

    const user = await prisma.users.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        address: "",
        phoneNumber: 0,
        zipCode: 0,
        country: "",
        imgUrl: "",
      },
    });
    return Response.json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return Response.json({ message: "Something went wrong", error });
  }
}
