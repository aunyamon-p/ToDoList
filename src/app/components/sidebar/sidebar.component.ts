import { Component , Input , Output , EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html', 
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() activePage: 'mytask' | 'kanban' = 'mytask';
  @Output() menuSelect = new EventEmitter<'mytask' | 'kanban'>();

  selectMytask() {
    this.menuSelect.emit('mytask');
  }

  selectKanban() {
    this.menuSelect.emit('kanban');
  }
}
