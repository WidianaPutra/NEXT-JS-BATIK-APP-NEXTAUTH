import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return Response.json(
        { error: { message: "login dulu boy" } },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const file = formData.get("file");
    if (file instanceof Blob) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const date = new Date();

      const fileName = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}-product-${token?.user_id}-${file.name}`;
      const filePath = path.join(process.cwd(), "public/products", fileName);

      // Buat folder 'uploads' jika belum ada
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      // Simpan file
      fs.writeFileSync(filePath, buffer);

      return Response.json({
        message: "File berhasil disimpan",
        fileName: fileName,
        token,
      });
    } else {
      return Response.json(
        { error: "Tidak ada file yang dikirim" },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json({ error: { error } }, { status: 500 });
  }
}
