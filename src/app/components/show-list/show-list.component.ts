import { Component , Input , Output , EventEmitter, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.scss'
})
export class ShowListComponent {
  @Input() todoList: any[] = [];
  @Output() taskClick = new EventEmitter<any>();
  @Output() openModal = new EventEmitter<'add'>();
  
  get mytasks() {
    return this.todoList.filter(t => t.status === 'todo' || t.status === 'inprogress');
  }

  onAddClick() {
    this.openModal.emit('add');
  }

  onTaskClick(task: any) {
    this.taskClick.emit(task);
  }
}
