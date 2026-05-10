import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {

  try {

    const formData = await request.formData();

    const title = formData.get("title");
    const category = formData.get("category");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const image = formData.get("image");

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
      .replaceAll(" ", "-");

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        imageUrl: uploadResponse.secure_url,
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