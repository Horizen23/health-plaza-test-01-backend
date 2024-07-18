import { Request, Response } from 'express';
import { Todo, todos, getNextId } from '../models/todo';

interface TodoParams {
         id: string;
}


interface CreateTodoBody {
         title: string;
}

interface UpdateTodoBody {
         title?: string;
         completed?: boolean;
}

type GetTodosRequest = Request<{}, Todo[], {}, {}>;
type GetTodoByIdRequest = Request<TodoParams, Todo, {}, {}>;
type CreateTodoRequest = Request<{}, Todo, CreateTodoBody, {}>;
type UpdateTodoRequest = Request<TodoParams, Todo, UpdateTodoBody, {}>;
type DeleteTodoRequest = Request<TodoParams, {}, {}, {}>;

type TodoResponse = Response;

export const getTodos = (req: GetTodosRequest, res: TodoResponse): void => {
         res.json(todos);
};

export const getTodoById = (req: GetTodoByIdRequest, res: TodoResponse): void => {
         const id = parseInt(req.params.id);
         const todo = todos.find(todo => todo.id === id);
         if (todo) {
                  res.json(todo);
         } else {
                  res.status(404).json({ message: 'Todo not found' });
         }
};

export const createTodo = (req: CreateTodoRequest, res: TodoResponse): void => {
         const { title } = req.body;
         const newTodo: Todo = { id: getNextId(), title, completed: false };
         todos.push(newTodo);
         res.status(201).json(newTodo);
};

export const updateTodo = (req: UpdateTodoRequest, res: TodoResponse): void => {
         const id = parseInt(req.params.id);
         const { title, completed } = req.body;
         const todo = todos.find(todo => todo.id === id);
         if (todo) {
                  if (title !== undefined) todo.title = title;
                  if (completed !== undefined) todo.completed = completed;
                  res.json(todo);
         } else {
                  res.status(404).json({ message: 'Todo not found' });
         }
};

export const deleteTodo = (req: DeleteTodoRequest, res: TodoResponse): void => {
         const id = parseInt(req.params.id);
         const index = todos.findIndex(todo => todo.id === id);
         if (index !== -1) {
                  todos.splice(index, 1);
                  res.status(204).send();
         } else {
                  res.status(404).json({ message: 'Todo not found' });
         }
};