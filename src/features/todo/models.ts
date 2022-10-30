export interface ITodoItem {
  id: number;
  text: string;
  done: boolean
}

export enum LocalStorageKeys {
  todoItemsKey = 'todoItems'
}