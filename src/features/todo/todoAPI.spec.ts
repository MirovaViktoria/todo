import { ITodoItem, LocalStorageKeys, TodoItemsFilterState } from './models';
import { addTodo, checkTodo, fetchTodos } from "./todoAPI";

describe('Todo API', ()=>{
    it('Shuold return items from local storage', async function (){
        //Arrange
        let item : ITodoItem ={
            id: 1,
            done: false,
            text: 'some desc'
        };
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify([item]));


        //Act
        let result = await fetchTodos(TodoItemsFilterState.All)

        //Assert
        expect(result.length).toEqual(1);
        expect(result[0].text).toEqual(item.text);
    })

    it('Should add new item to local storage', async function () {
        //Arrange
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify([]));
        let item : ITodoItem ={
            id: 1,
            done: false,
            text: 'some desc'
        };

        //Act
        await addTodo( item.text)
        let result = await fetchTodos(TodoItemsFilterState.All)

        //Assert
        expect(result.length).toEqual(1);
        expect(result[0].text).toEqual(item.text);
    })


    it('Should change is done in local storage', async function(){
        //Arrange
        let item : ITodoItem ={
            id: 1,
            done: false,
            text: 'some desc'
        };
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify([item]));

        //act
        await checkTodo(item.id, true);
        let result = await fetchTodos(TodoItemsFilterState.All)

        expect(result[0].done).toEqual(true);
    })

    it('Should return retrun active items', async function(){
        //Arrange
        let item : ITodoItem ={
            id: 1,
            done: false,
            text: 'some desc'
        };
        let item2 : ITodoItem ={
            id: 2,
            done: true,
            text: 'some desc'
        };
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify([item, item2]));   

        //act
        let result = await fetchTodos(TodoItemsFilterState.Active)


        //Assert
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(1);
    });

    it('Should return retrun completed items', async function(){
        //Arrange
        let item : ITodoItem ={
            id: 1,
            done: false,
            text: 'some desc'
        };
        let item2 : ITodoItem ={
            id: 2,
            done: true,
            text: 'some desc'
        };
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify([item, item2]));   

        //act
        let result = await fetchTodos(TodoItemsFilterState.Completed)


        //Assert
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(2);
    });
})