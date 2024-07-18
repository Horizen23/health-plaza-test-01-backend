export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export let todos: Todo[] = [];

let currentId = 1;

export function getNextId(): number {
    return currentId++;
}
