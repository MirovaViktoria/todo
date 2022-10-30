import { ITodoItem, LocalStorageKeys } from "./models";

//get all
export function fetchTodos() {
  return new Promise<Array<ITodoItem>>((resolve) =>
    {
        let items:Array<ITodoItem> = [];
        let value = localStorage.getItem(LocalStorageKeys.todoItemsKey);
        if(value!=null){
            items = JSON.parse(value);
        }
        setTimeout(() => resolve(items), 500)
    }
  );
}

//todo: clear
//todo: active
//todo: update
//todo: add
//todo: completed
