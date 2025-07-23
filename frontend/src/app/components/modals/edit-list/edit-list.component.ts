import { Component , Input , Output , EventEmitter , OnChanges , SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.scss'
})
export class EditListComponent {
  @Input() task: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>(); 
  previewImage: string | null = null;
  editedTask: any = {};

  onClose() {
    this.close.emit()
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent){
    event.preventDefault();
  }

  onDrop(event: DragEvent){
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
    this.editedTask = { ...this.task };
    if (this.task.dueDate) {
      const date = new Date(this.task.dueDate);
      this.editedTask.dueDate = date.toISOString().split('T')[0];
    }
    this.previewImage = this.editedTask.image || null;
  }
  }

  removeImage() {
    this.previewImage = null;
    this.editedTask.image = '';
  }

  onSave(){
    this.editedTask.image = this.previewImage || '';
    if (this.editedTask.dueDate) {
      this.editedTask.dueDate = new Date(this.editedTask.dueDate);
    }
    this.save.emit(this.editedTask);
  }


}
