import { addTodoAsync, checkTodoAsync, clearCompletedAsync, fetchTodoAsync, selectTodoItems } from "./todoSlice";

import React from "react";
import { TodoItemsFilterState } from "./models";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useState } from "react";

export function Todo(){
    const items = useAppSelector(selectTodoItems);
    let [newText, setNetText] = useState('');
    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTodoAsync(TodoItemsFilterState.All))
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    function handleFilterChanged(e:React.ChangeEvent<HTMLInputElement>){
        dispatch(fetchTodoAsync(  e.target.value as TodoItemsFilterState))
    }
    return(<div>
        <div>
            <input value={newText} onChange={e=>setNetText(e.target.value)}></input>
            <button onClick={e=>{dispatch(addTodoAsync(newText)); setNetText('')}}>add</button>
        </div>
        {items.map((item) =>(
            <div key={item.id}>
                <input defaultChecked={item.done} type="checkbox" 
                onChange={e=>dispatch(checkTodoAsync({id: item.id,isDone: e.target.checked}))}>
                </input>
                <label>{item.text}</label>
            </div>
        ))}
        <div>
            <label>All</label><input type="radio" name="filter" value={TodoItemsFilterState.All} defaultChecked={true} onChange={handleFilterChanged}></input>
            <label>Active</label><input type="radio" name="filter" value={TodoItemsFilterState.Active}  onChange={handleFilterChanged}></input>
            <label>Completed</label><input type="radio" name="filter" value={TodoItemsFilterState.Completed} onChange={handleFilterChanged} ></input>

        </div>
        <div>
            <button onClick={e=>dispatch(clearCompletedAsync())}>clear completed</button>
        </div>
    </div>)
}