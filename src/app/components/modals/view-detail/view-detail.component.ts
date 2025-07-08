import { Component , Input , Output , EventEmitter } from '@angular/core';
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

  onEditClick() {
    this.openModal.emit('edit');
  }

  onDeleteClick(){
    this.delete.emit();
  }

  onClose() {
    this.close.emit()
  }

  
}
