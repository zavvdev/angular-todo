import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from 'src/app/todos/types/filter.enum';
import { TodoInterface } from 'src/app/todos/types/todo.interface';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(name: string): void {
    const newTodo: TodoInterface = {
      name,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }

  changeFilter(nextFilter: FilterEnum): void {
    this.filter$.next(nextFilter);
  }

  changeTodo(todoId: string, newName: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          name: newName,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }

  removeTodo(todoId: string): void {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== todoId);
    this.todos$.next(updatedTodos);
  }

  toggleTodo(todoId: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }
}
