import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
