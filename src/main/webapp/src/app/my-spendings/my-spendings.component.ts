import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-my-spendings',
  templateUrl: './my-spendings.component.html',
  styleUrls: ['./my-spendings.component.scss']
})
export class MySpendingsComponent implements OnInit {

  selectedMonth: string = 'Current Month';
  months: string[] = ['Current Month', 'Past Month 1', 'Past Month 2', '...'];

  displayedColumns: string[] = ['product', 'price', 'category'];
  spendings: any[] = []; // Create a Spending model to represent your data

  // Define chart data
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    // Initialize chart data based on the spendings data
  }

  addSpending() {
    const dialogRef = this.dialogService.openSpendingsDialog();
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    })
  }
}
