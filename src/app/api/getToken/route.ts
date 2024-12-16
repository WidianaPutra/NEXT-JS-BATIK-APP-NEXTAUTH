import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    return Response.json({ token }, { status: 200 });
  }
  return Response.json(
    { error: { message: "Token Not Found" } },
    { status: 404 }
  );
}
