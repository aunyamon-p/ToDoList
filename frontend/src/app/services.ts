import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

//โครงสร้างข้อมูล Todo ที่ใช้ทั่วทั้งแอป
export interface Todo {
    _id: string;
    title: string;
    createdAt?: Date;
    dueDate?: Date;
    priority?: string; //ใช้ string เฉยๆได้
    status?: string; //ใช้ string เฉยๆได้
    note?: string;
    image?: string;
    }

//บอก Angular ว่าบริการนี้จะถูกสร้างไว้กลางแอป ใช้ได้ทุกที่
@Injectable({
    providedIn: 'root'
})
export class Service {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/todos';

    //ดึงรายการ Todo ทั้งหมดจาก API -> get
    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    //เพิ่ม Todo ใหม่ไปยัง API -> post
    //ใช้ Partial ไม่บังคับให้ทุกฟิลด์ต้องมีค่า
    addTodo(todo: Partial<Todo>): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo);
    }

    //อัพเดต Todo ที่มีอยู่ใน API -> put
    //id เป็นตัวแปรรับ _id ตั้งชื่อยังไงก็ได้
    //${this.apiUrl}/${id} = endpoint ที่จะอัพเดต
    updateTodo(id: string, updates: Partial<Todo>): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, updates);
    }
    
    //อัพเดท status เมื่อ drag&drop task ที่ Kanban board
    updateTaskStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { status });
    }

    deleteTodo(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}