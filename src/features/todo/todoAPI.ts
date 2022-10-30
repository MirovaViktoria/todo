import { ITodoItem, LocalStorageKeys } from "./models";

//get all
export function fetchTodos() {
  return new Promise<Array<ITodoItem>>((resolve) =>
    {
      console.log('fetch')
        let items:Array<ITodoItem> = [];
        let value = localStorage.getItem(LocalStorageKeys.todoItemsKey);
        if(value!=null){
            items = JSON.parse(value);
        }
        setTimeout(() => resolve(items), 500)
    }
  );
}

export function addTodo(text:string){
  return new Promise((resolve) =>
    {
      
        let items:Array<ITodoItem> = []
        let value = localStorage.getItem(LocalStorageKeys.todoItemsKey);
        if(value!=null){
            items = JSON.parse(value);
        }
        items.push({id: items.length, done: false, text: text});
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify(items));
        setTimeout(() => resolve(items), 500)
    }
  );
}

//todo: clear
//todo: active
//todo: update
//todo: add
//todo: completed
