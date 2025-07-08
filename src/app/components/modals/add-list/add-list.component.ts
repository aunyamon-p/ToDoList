import { Component , Output , EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.scss'
})
export class AddListComponent {
  @Output() add = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  status = 'todo';
  previewImage: string | null = null;

  id = 0

  task = {
    id: 0,
    title: '',
    date: '',
    priority: '',
    status: '',
    description: '',
    image: '',
    dateCreate: '', 
  };

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

  removeImage() {
    this.previewImage = null;
    this.task.image = '';
  }

  
  onAdd(){
    this.task.id = Math.floor(Math.random() * 1000000);
    
    if (this.previewImage) {
    this.task.image = this.previewImage;
  }
  this.task.dateCreate = new Date().toISOString().slice(0, 10);
    this.add.emit(this.task);

  }

    
}
