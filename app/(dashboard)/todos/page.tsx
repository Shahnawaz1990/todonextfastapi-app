import { getTask } from "@/app/action";


import { TodoColumn } from "./components/columns"
import { TodosClient } from "./components/client";
import { useRouter } from "next/navigation";

  

interface Todo {
  id: string;
  content: string;
}

const TodosPage = async () => {
  const todos: Todo[] = await getTask()

  const formattedTodos: TodoColumn[] = todos.map((item) => ({
    id: item.id,
    content: item.content
  }));
  // console.log(todos);
  

  return (
    <div className="flex-col">
      
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* {todos.map((todo: Todo) => (
          <div key={todo.id}>
            <div>{todo.id}</div>
            <div>{todo.content}</div>
          </div>
        ))} */}


        <TodosClient data={formattedTodos} />
      </div>
    </div>
  );
};

export default TodosPage;
