import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  templateUrl: 'todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps: TodoInterface | undefined;
  @Input('isEditing') isEditingProp: boolean = false;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();

  editingText: string | undefined = '';
  @ViewChild('textInput') textInput: ElementRef | undefined = undefined;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps?.name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProp'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps?.id);
  }

  removeTodo(): void {
    if (this.todoProps?.id) {
      this.todosService.removeTodo(this.todoProps.id);
    }
  }

  toggleTodo(): void {
    if (this.todoProps?.id) {
      this.todosService.toggleTodo(this.todoProps.id);
    }
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo(): void {
    this.setEditingIdEvent.emit(null);
    if (this.todoProps?.id && this.editingText) {
      this.todosService.changeTodo(this.todoProps.id, this.editingText);
    }
  }
}
