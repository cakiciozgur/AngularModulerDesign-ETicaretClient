import { Component , OnInit} from '@angular/core';

declare var alertify: any

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit
{
  constructor() { }

  ngOnInit(): void {
    alertify.success('Im ready!');
  }
}
