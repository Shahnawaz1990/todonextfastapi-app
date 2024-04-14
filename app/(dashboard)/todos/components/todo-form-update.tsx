"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { ArrowLeft, ArrowRight, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "./heading"
import { AlertModal } from "./alert-modal"
import Link from "next/link"



const formSchema = z.object({
  id: z.coerce.number().min(1),
  content: z.string().min(1),
});

type TodoFormValues = z.infer<typeof formSchema>


export const TodoFormUpdate = ({
  id
}: {
  id: number
}) => {
  // const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = 'Edit Todo';
  const description = 'Edit a Todo.';
  const toastMessage = 'Todo updated.';
  const action = 'Save changes';
// console.log(initialData);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      
      content: ''
    }
  });

  const onSubmit = async (data: TodoFormValues) => {
    try {
      setLoading(true);
      // console.log(data);
      // console.log(id);
      
      
      await axios.put(`http://127.0.0.1:8000/todos/${id}`, data);

      router.refresh();
      console.log("hogaya");
      
      toast.success(toastMessage);
      router.push('/todos');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://127.0.0.1:8000/todos/${id}`);
      router.refresh();
      router.push(`/todos`);
      toast.success('Todo deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all products using this size first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
    <div className="flex justify-start">
          <Link href="/todos">
            <Button className="bg-black">
              Get Todo App Started
              <ArrowLeft className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
