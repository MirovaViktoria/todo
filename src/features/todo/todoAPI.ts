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

export function checkTodo(id:number,isDone:boolean){
   return new Promise<ITodoItem>((resolve) =>
    {
      
        let items:Array<ITodoItem> = []
        let value = localStorage.getItem(LocalStorageKeys.todoItemsKey);
        if(value!=null){
            items = JSON.parse(value);
        }
      
        let item = items.find(n=>n.id === id);
        if(item==null)
          throw new Error('Something bad happened');
        item.done = isDone;
          
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify(items));
        setTimeout(() => resolve(item as ITodoItem), 500)
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
