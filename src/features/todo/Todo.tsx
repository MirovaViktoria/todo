import { addTodoAsync, checkTodoAsync, fetchTodoAsync, selectTodoItems } from "./todoSlice";

import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useState } from "react";

export function Todo(){
    const items = useAppSelector(selectTodoItems);
    let [newText, setNetText] = useState('');
    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTodoAsync())
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
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
    </div>)
}