"use server"

import axios from "axios";

export const getTask = async () => {
    const fetchTask = await axios.get("http://127.0.0.1:8000/todos")
        
    const res = fetchTask.data
    return res
}

export const getTaskById = async (id:number) => {
    const fetchTask = await fetch(`http://127.0.0.1:8000/todos/${id}`)
    const res = fetchTask.json()
    return res
}
