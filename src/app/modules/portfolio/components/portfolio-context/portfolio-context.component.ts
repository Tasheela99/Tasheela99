import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-portfolio-context',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './portfolio-context.component.html',
  styleUrl: './portfolio-context.component.scss'
})
export class PortfolioContextComponent {

}
