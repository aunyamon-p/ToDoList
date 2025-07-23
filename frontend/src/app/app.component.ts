import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInPageComponent } from "./pages/sign-in-page/sign-in-page.component";
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInPageComponent ,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ToDoList';
}
