import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();
    const collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    let collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }
    const { title, description, image } = await req.json();
    if (!title || !image) {
      return new NextResponse("All fields are required", { status: 400 });
    }
    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      {
        title,
        description,
        image,
      },
      { new: true } // to return the updated document otherwise it will return the old document
    );
    await collection.save();
    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    await Collection.findByIdAndDelete(params.collectionId);
    revalidatePath("/collections");
    return new NextResponse("Collection is Deleted", { status: 200 });
  } catch (err) {
    console.log("[collectionId_DELETE]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
