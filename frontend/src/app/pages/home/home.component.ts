  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { NavbarComponent } from '../../components/navbar/navbar.component';
  import { SidebarComponent } from '../../components/sidebar/sidebar.component';
  import { ViewDetailComponent } from '../../components/modals/view-detail/view-detail.component';
  import { ShowListComponent } from '../../components/show-list/show-list.component';
  import { EditListComponent } from '../../components/modals/edit-list/edit-list.component';
  import { AddListComponent } from '../../components/modals/add-list/add-list.component';
  import { KanbanComponent } from '../../components/kanban/kanban.component';
  import { Service , Todo} from '../../services';
  import { HttpClient } from '@angular/common/http';

  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      NavbarComponent,
      SidebarComponent,
      ViewDetailComponent,
      ShowListComponent,
      EditListComponent,
      AddListComponent,
      KanbanComponent
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent {
    showAddModal = false;
    showEditModal = false;
    showViewModal = false;
    selectedTask: any = null;
    selectedTaskFromKanban = false;
    selectedPage: 'mytask' | 'kanban' = 'mytask';
    todoList: any[] = [];

    constructor(
      private Service: Service) {}
    

    ngOnInit() {
      this.fetchTodos();
    }

    fetchTodos() {
      this.Service.getTodos().subscribe({
        next: (data) => this.todoList = data,
        error: (error) => console.error('Failed to fetch todos:', error)
      });
    }

    onOpenModal(type: 'add' | 'edit', task?: any) {
      this.showAddModal = false;
      this.showEditModal = false;
      this.showViewModal = false;
      if (type === 'add') {
        this.showAddModal = true;
      } else if (type === 'edit' && task) {
        this.selectedTask = { ...task };
        this.showEditModal = true;
      }
    }

    onClickTaskKanban(task: any) {
      this.selectedTask = task;
      this.selectedTaskFromKanban = true;
      this.showViewModal = true;
    }

    onCloseModal() {
      this.showAddModal = false;
      this.showEditModal = false;
      this.showViewModal = false;
    }

    onCloseViewDetail() {
      this.selectedTask = null;
    }

    onTaskClick(task: any) {
      if (this.selectedTask && this.selectedTask._id === task._id) {
        this.selectedTask = null;
        this.selectedTaskFromKanban = false;
      } else {
        this.selectedTask = task;
        this.selectedTaskFromKanban = false;
      }
    }

    onSaveChange(updatedTask: Todo) {
    this.Service.updateTodo(updatedTask._id, updatedTask).subscribe({
      next: (res) => {
        // อัปเดตใน todoList ด้วยข้อมูลที่อัปเดตแล้วจาก backend
        const index = this.todoList.findIndex(t => t._id === res._id);
        if (index !== -1) {
          this.todoList[index] = res;
        }
        this.selectedTask = res;
        this.showEditModal = false;
      },
      error: (err) => {
        console.error('Failed to update todo:', err);
        // อาจแสดงข้อความแจ้งเตือนผู้ใช้ก็ได้
      }
    });
    }

    updateTaskStatus(updatedTask: any) {
    this.Service.updateTaskStatus(updatedTask._id, updatedTask.status).subscribe(() => {
      console.log('Task status updated in DB');
    });
    }

    onAddTask(newTask: any) {
      this.todoList.push(newTask);
      this.showAddModal = false;
    }

    deleteTask() {
      if (this.selectedTask) {
        console.log("Delete task triggered for:", this.selectedTask._id);
        this.Service.deleteTodo(this.selectedTask._id).subscribe({
          next: () => {
            this.todoList = this.todoList.filter(t => t._id !== this.selectedTask._id);
            this.selectedTask = null;
          },
          error: error => console.error('Failed to delete todo:', error)
        });
      }
    }

    onSelectPage(page: 'mytask' | 'kanban') {
      this.selectedPage = page;
      this.selectedTask = null;
      this.showViewModal = false;
    }
  }
