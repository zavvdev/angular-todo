import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { TodosService } from 'src/app/todos/services/todos.service';
import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { map } from 'rxjs/operators';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-main',
  templateUrl: 'main.component.html',
})
export class MainComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodosClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;

  constructor(private todosService: TodosService) {
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$,
    ]).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
