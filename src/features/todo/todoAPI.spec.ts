import { ITodoItem, LocalStorageKeys } from './models';
import { addTodo, fetchTodos } from "./todoAPI";

describe('Todo API', ()=>{
    it('Todo api return list from local store', async function (){
        //Arrange
        let item : ITodoItem ={
            id: 1,
            done: false,
            text: 'some desc'
        };
        localStorage.setItem(LocalStorageKeys.todoItemsKey,  JSON.stringify([item]));


        //Act
        let result = await fetchTodos()

        //Assert
        expect(result.length).toEqual(1);
        expect(result[0].text).toEqual(item.text);
    })

    it('Add new item->fetch items->item there', async function () {
        //Arrange
        let item : ITodoItem ={
            id: 1,
            done: false,
            text: 'some desc'
        };

        //Act
        await addTodo( item.text)
        let result = await fetchTodos()

        //Assert
        expect(result.length).toEqual(1);
        expect(result[0].text).toEqual(item.text);
    })
})