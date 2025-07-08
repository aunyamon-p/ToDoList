import { Component , Input , Output , EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {
  @Input() todoList: any[] = [];
  @Output() taskClick = new EventEmitter<any>();

  dragTask: any = null;

  get todoTasks(){
    return this.todoList.filter(t => t.status === 'todo');
  }

  get inprogressTasks(){
    return this.todoList.filter(t => t.status === 'inprogress')
  }

   get doneTasks(){
    return this.todoList.filter(t => t.status === 'done')
  }

  onTaskClick(task: any) {
    this.taskClick.emit(task);
  }

  onDragStart(event: DragEvent, task: any){
    this.dragTask = task;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, newStatus: 'todo' | 'inprogress' | 'done'){
    event.preventDefault();
    if(this.dragTask) {
      this.dragTask.status = newStatus;
      this.dragTask = null;
    }
  }

  
}
