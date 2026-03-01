import { Component, OnInit } from '@angular/core';

export interface StockInfo {
  id: number;
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  private allStocks: StockInfo[] = [];

  displayedData: StockInfo[] = [];
  totalItems = 250000;
  pageSize = 50;
  currentPage = 1;
  totalPages = 0;
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
    this.generateDummyData();
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.loadPage(1);
  }

  // Generate 250,000 records dynamically
  private generateDummyData(): void {
    console.log('Generating 2.5 lakh dummy records...');
    const symbols = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA', 'BABA', 'V'];

    for (let i = 1; i <= this.totalItems; i++) {
      const basePrice = Math.random() * 1000 + 10;
      this.allStocks.push({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)] + '-' + i,
        price: parseFloat(basePrice.toFixed(2)),
        change: parseFloat(((Math.random() * 10) - 5).toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 1000,
      });
    }
  }

  // Faux API Call
  private fetchStocks(page: number, limit: number): Promise<StockInfo[]> {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        resolve(this.allStocks.slice(start, end));
      }, 300); // 300ms delay to feel like API
    });
  }

  async loadPage(page: number): Promise<void> {
    if (page < 1 || page > this.totalPages) return;

    this.isLoading = true;
    this.currentPage = page;

    // Simulate API fetch using standard pagination logic
    this.displayedData = await this.fetchStocks(this.currentPage, this.pageSize);

    this.isLoading = false;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

  goToPage(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const pageNum = parseInt(input, 10);
    if (!isNaN(pageNum)) {
      this.loadPage(pageNum);
    }
  }
}
