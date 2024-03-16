"use client";
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { useEffect, useState } from "react";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetials, setCollectionDetails] =
    useState<CollectionType | null>(null);
  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err);
    }
  };
  useEffect(() => {
    getCollectionDetails();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetials} />
  );
};

export default CollectionDetails;
