import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  factorialResult!: number;
  factorialInput: number = 1;
  loading: boolean = false;

  constructor() {
    
  }

  calculateFactorial() {
    this.loading = true;
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./calc-factorial.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.factorialResult = data;
        this.loading = false;
      };
      worker.postMessage(this.factorialInput);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
