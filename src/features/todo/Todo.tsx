import { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchTodoAsync, selectTodoItems } from "./todoSlice";
import { useAppSelector } from "../../app/hooks";
export function Todo(){
    const items = useAppSelector(selectTodoItems);

    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTodoAsync)
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return(<div>
        {items.map((item) =>(
            <div key={item.id}>
                <input defaultChecked={item.done}>
                </input>
                <label>{item.text}</label>
            </div>
        ))}
    </div>)
}