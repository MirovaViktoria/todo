export interface ITodoItem {
  id: number;
  text: string;
  done: boolean
}
export enum TodoItemsFilterState{
    All = 'all',
    Active = 'active',
    Completed = 'completed'
}

export enum LocalStorageKeys {
  todoItemsKey = 'todoItems'
}