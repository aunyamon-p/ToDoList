import { Component , Output , EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Service} from '../../../services';

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
  previewImage: string | null = null;

  task = {
    title: '',
    dueDate: '',
    priority: 'extreme',
    status: 'todo',
    note: '',
    image: ''
  };

  //เพื่อให้เรียก service ได้
  constructor(private service: Service) {}

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
    const newTask = {
      title: this.task.title,
      dueDate: this.task.dueDate ? new Date(this.task.dueDate) : undefined,
      priority: this.task.priority || 'extreme', //กำหนด default ถ้าว่าง
      status: this.task.status || 'todo', //กำหนด default ถ้าว่าง
      note: this.task.note,
      image: this.previewImage ?? ''
    };

    this.service.addTodo(newTask).subscribe({
      next: (newTodo) => {
        console.log('Task added successfully:', newTodo);
        this.add.emit(newTodo);
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    })
  }
    
}
