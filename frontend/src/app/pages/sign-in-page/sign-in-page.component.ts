import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [RouterLink,ButtonComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent {

}
