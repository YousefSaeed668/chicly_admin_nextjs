"use client";
import { columns } from "@/components/collections/CollectionsColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const rotuer = useRouter();
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[Collections_Get]", err);
    }
  };
  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-heading2-bold ">Collections</p>
        <Button
          className="bg-blue-1 text-white px-1 sm:px-3  ml-auto"
          onClick={() => rotuer.push("/collections/new")}
        >
          <Plus className="h-4 w-4 mr-1" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
