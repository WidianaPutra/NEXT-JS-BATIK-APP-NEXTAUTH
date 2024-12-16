import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = await params;

  if (!email) {
    return Response.json(
      {
        message: "Email is required (params url)",
      },
      { status: 400 }
    );
  }

  try {
    const userData: any = await prisma.users.findUnique({
      where: { email },
      select: {
        user_id: true,
        username: true,
        email: true,
        role: true,
        imgUrl: true,
        phoneNumber: true,
      },
    });
    if (!userData) {
      return Response.json(
        {
          error: {
            message: "Account not found",
          },
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        data: userData,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
