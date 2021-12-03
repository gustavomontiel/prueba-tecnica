import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Prueba Técnica';
  showLoading: boolean = false;

  constructor(private loadingService: LoadingService, private router: Router) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.showLoading = false;
    this.loadingService.isLoading.subscribe((res: boolean) => {
      // setTimeout por el problema en tiempo de desarrollo: https://blog.angular-university.io/angular-debugging/
      setTimeout(() => {
        this.showLoading = res;
        this.router.navigate(['/heroes']);
      });
    });
  }
}
