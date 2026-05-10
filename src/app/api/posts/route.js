import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const image = formData.get("image");

    if (!title || !content || !image || image.size === 0) {
      return Response.json(
        { error: "Title, content, and image are required." },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "personal-blog",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        imageUrl: uploadResponse.secure_url,
        authorId: session.user.id,
      },
    });

    return Response.json(post);
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
