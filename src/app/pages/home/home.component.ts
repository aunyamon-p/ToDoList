import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {ViewDetailComponent} from '../../components/modals/view-detail/view-detail.component';
import {ShowListComponent } from '../../components/show-list/show-list.component';
import { EditListComponent } from "../../components/modals/edit-list/edit-list.component";
import { AddListComponent } from '../../components/modals/add-list/add-list.component';
import { KanbanComponent } from '../../components/kanban/kanban.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent, SidebarComponent, ViewDetailComponent, ShowListComponent, EditListComponent ,AddListComponent ,KanbanComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showAddModal = false;
  showEditModal = false;
  showViewModal = false;
  selectedTask: any = null;
  selectedTaskFromKanban = false;
  selectedPage: 'mytask' | 'kanban' = 'mytask';
  

  onOpenModal(type: 'add' | 'edit', task?: any){
    this.showAddModal = false;
    this.showEditModal = false;
    this.showViewModal = false;
    if(type === 'add'){
      this.showAddModal = true;
    }else if(type === 'edit' && task){
        this.selectedTask = {...task};
        this.showEditModal = true;
    }
  }

  onClickTaskKanban(task: any){
    this.selectedTask = task;
    this.selectedTaskFromKanban = true;
    this.showViewModal = true;
  }

  onCloseModal(){
    this.showAddModal = false;
    this.showEditModal = false;
    this.showViewModal = false;
  }

  onCloseViewDetail(){
    this.selectedTask = null;
}

  todoList = [
    { id: 1, title: 'Meeting with team dev',date: '2025-07-20', priority: 'extreme', status: 'todo' , description: 'at 4 p.m.\nTopics\n-update progress\n-talk about new project\n-any problems',image: '/assets/images/task1.png' ,dateCreate: '2025-07-03' },
    { id: 2, title: 'Take Sofia to hospital',date: '2025-08-10', priority: 'extreme', status: 'todo' , description: 'at 1 p.m.' ,image: '/assets/images/task2.jpg',dateCreate: '2025-07-01'},
    { id: 3, title: 'Learning Angular',date: '2025-07-08', priority: 'moderate', status: 'inprogress' , description: 'start mini project' ,image: '/assets/images/task3.avif',dateCreate: '2025-06-029' },
    { id: 4, title: 'Buy mushroom',date: '2025-07-04', priority: 'low', status: 'done' , description: 'do not forget to go with grandma' ,image: '/assets/images/task4.png',dateCreate: '2025-07-03' }
  ];

  onTaskClick(task: any) {
    if(this.selectedTask && this.selectedTask.id === task.id){
      this.selectedTask = null;
      this.selectedTaskFromKanban = false;
    }else {
      this.selectedTask = task;
      this.selectedTaskFromKanban = false;
    }
  }

  onSaveChange(updatedTask: any){
    const index = this.todoList.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
    this.todoList[index] = { ...updatedTask };
    }
    this.selectedTask = { ...updatedTask };
    this.showEditModal = false;
  }

  onAddTask(newTask: any){
    this.todoList.push(newTask);
    this.showAddModal = false;
  }

  deleteTask(){
  if(this.selectedTask){
    this.todoList = this.todoList.filter(t => t.id !== this.selectedTask.id);
    this.selectedTask = null;
    }
  }

  onSelectPage(page: 'mytask' | 'kanban'){
    this.selectedPage = page;
    this.selectedTask = null;
    this.showViewModal = false;
  }
}
