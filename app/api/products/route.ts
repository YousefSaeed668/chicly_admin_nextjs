import Product from "@/lib/models/Products";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    await connectToDB();
    const {
      title,
      description,
      media,
      category,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }
    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      tags,
      sizes,
      colors,
      price,
      expense,
    });
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.log("[Products_POST]", err);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
