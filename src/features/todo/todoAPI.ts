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
  return new Promise<ITodoItem>((resolve) =>
    {
      
        let items:Array<ITodoItem> = []
        let value = localStorage.getItem(LocalStorageKeys.todoItemsKey);
        if(value!=null){
            items = JSON.parse(value);
        }
        let newItem:ITodoItem = {id: items.length, done: false, text: text};
        items.push(newItem);
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify(items));
        setTimeout(() => resolve(newItem), 500)
    }
  );
}

//todo: clear
//todo: active
//todo: update
//todo: add
//todo: completed
