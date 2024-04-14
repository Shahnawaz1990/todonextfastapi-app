import { getTaskById } from "@/app/action";
import { TodoFormUpdate } from "../components/todo-form-update";

type Todo = {
  id: number;
  content: string;
}

const TodoPage = async ({
  params
}: {
  params: { todoId: number }
}) => {
  const todoById: Todo = await getTaskById(params.todoId)
  // console.log(todoById);
  // console.log(params.todoId);
  
  
  
  

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        
        <TodoFormUpdate id={params.todoId} />
      </div>
    </div>
  );
}

export default TodoPage;
