import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'trello';

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        console.log(user);
      },
      error: (error) => {
        console.log(error);
        this.authService.setCurrentUser(null);
      }
    });
  }
}
