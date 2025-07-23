import { Component , Input , Output , EventEmitter ,  SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.scss'
})
export class ViewDetailComponent {
  @Input() task: any;
  @Input() showViewModal = false;
  @Output() openModal = new EventEmitter<'edit'>();
  @Output() delete = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.task = {
        ...this.task,
        createdAt: this.task.createdAt ? new Date(this.task.createdAt) : undefined,
        dueDate: this.task.dueDate ? new Date(this.task.dueDate) : undefined
      };
    }
  }

  onEditClick() {
    this.openModal.emit('edit');
  }

  onDeleteClick(){
    console.log("Delete button clicked in ViewDetailComponent");
    this.delete.emit();
  }

  onClose() {
    this.close.emit()
  }

  
}
