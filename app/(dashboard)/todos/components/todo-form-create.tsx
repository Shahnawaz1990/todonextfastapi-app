"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { ArrowLeft, ArrowRight, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

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
import { revalidateTag } from "next/cache"



const formSchema = z.object({
  id: z.coerce.number().min(1),
  content: z.string().min(1),
});

type TodoFormValues = z.infer<typeof formSchema>

type Todo = {
  id: number,
  content: string
}



export const TodoFormCreate = ({
  
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = 'Create Todo';
  const description = 'Add a new Todo';
  const toastMessage = 'Todo created.';
  const action = 'Create';


  const form = useForm<TodoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ''
    }
  });

  const onSubmit = async (data: TodoFormValues) => {
    try {
      setLoading(true);
      // console.log(data);
      
      
      await axios.post('http://127.0.0.1:8000/todos', data)
      router.refresh();
      console.log(toast.success(toastMessage))
      router.push('/todos');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
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
