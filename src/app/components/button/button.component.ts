import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = 'button';
  @Input() variant: 'login' | 'register' |'logout' = 'login';
  @Input() disabled: boolean = false;


  get variantClass(){
    switch (this.variant) {
      case 'login':
      case 'register':
        return 'bg-red-400 w-1/3 block';
      case 'logout':
        return 'bg-red-400 font-bold';
    }
  }
}
