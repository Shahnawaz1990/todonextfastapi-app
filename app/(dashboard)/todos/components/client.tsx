"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { columns, TodoColumn } from "./columns";
import { Heading } from "./heading";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

interface TodoClientProps {
  data: TodoColumn[];
}



export const TodosClient: React.FC<TodoClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
  router.refresh()  
  }, [router]);

  

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Todos (${data.length})`} description="Manage todos" />
        <Button onClick={() => router.push(`/todos/createTodo`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="content" columns={columns} data={data} />
      <Separator />
    </>
  );
};
