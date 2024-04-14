import { getTaskById } from "@/app/action";
import { TodoFormCreate } from "../components/todo-form-create";

type Todo = {
  id: string;
  content: string;
}

const TodoPage = async ({
  params
}: {
  params: { todoId: string }
}) => {
  
  
  

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        
        <TodoFormCreate />
      </div>
    </div>
  );
}

export default TodoPage;
