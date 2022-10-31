import {
TodoItemsStatus,
addTodoAsync,
checkTodoAsync,
clearCompletedAsync,
fetchTodoAsync,
selectLeftCount,
selectStatus,
selectTodoItems
} from "./todoSlice";

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from "react";
import TextField from '@mui/material/TextField';
import { TodoItemsFilterState } from "./models";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useState } from "react";

export function Todo(){
    const items = useAppSelector(selectTodoItems);
    const itemsLeft = useAppSelector(selectLeftCount);
    const status = useAppSelector(selectStatus);
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
    const handleKeyboardEvent = (e:React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter'){
            dispatch(addTodoAsync(newText));
            setNetText('');
        }
    };

    return(<div>
        <div className="title">TODO</div>
        <div className="loading">
            {status === TodoItemsStatus.Loading && 
            <div>
                <CircularProgress /></div>}
        </div>
        <div className="todo_list"><div className="counter">Itmes left: {itemsLeft}</div>
        <div className="add_todo">
            <TextField id="standard-basic" autoFocus label="Добавить" onKeyDown={handleKeyboardEvent} variant="standard" value={newText} onChange={e=>setNetText(e.target.value)}/>
            <Button variant="contained" id="add-button" endIcon={<AddIcon />} onClick={e=>{dispatch(addTodoAsync(newText)); setNetText('')}}>
        Add
      </Button>
        </div>
        {items.map((item) =>(
            <div className="task_list" key={item.id}>
                <input defaultChecked={item.done} id={"Todo"+item.id} type="checkbox" 
                onChange={e=>dispatch(checkTodoAsync({id: item.id,isDone: e.target.checked}))}>
                </input>
                <label htmlFor={"Todo"+item.id} className={item.done? "done":""}  >{item.text}</label>
            </div>  
        ))}
        <div className="buttons">
            <div className="form_radio_btn"><input id="all" type="radio" name="filter" value={TodoItemsFilterState.All} defaultChecked={true} onChange={handleFilterChanged}></input><label htmlFor="all">All</label></div>
            <div className="form_radio_btn"><input id="active" type="radio" name="filter" value={TodoItemsFilterState.Active}  onChange={handleFilterChanged}></input> <label htmlFor="active">Active</label></div>
            <div className="form_radio_btn"><input id="completed" type="radio" name="filter" value={TodoItemsFilterState.Completed} onChange={handleFilterChanged}></input><label htmlFor="completed">Completed</label></div>
        </div>
        <div>
            <Button endIcon={<DeleteForeverIcon />} onClick={e=>dispatch(clearCompletedAsync())}>Clear completed</Button>
        </div>
        </div>
    </div>)
}