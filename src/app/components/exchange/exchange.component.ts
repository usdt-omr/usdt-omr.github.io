import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-buy',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class ExchangeComponent {
  spendAmountBuy: number|any = 0;
  receiveAmountBuy: number|any = 0;
  spendAmountSell: number|any = 0;
  receiveAmountSell: number|any = 0;
  conversionMessage: string = '';

  private linearInterpolation(minValue: number, maxValue: number, minRate: number, maxRate: number, value: number): number {
    if (value <= minValue) return minRate;
    if (value >= maxValue) return maxRate;
    return minRate + (maxRate - minRate) * ((value - minValue) / (maxValue - minValue));
  }

  private getBuyExchangeRate(): number {
    if (this.spendAmountBuy < 384) {
      return this.linearInterpolation(0, 384, 0.4, 0.4, this.spendAmountBuy);
    } else if (this.spendAmountBuy >= 384 && this.spendAmountBuy <= 768) {
      return this.linearInterpolation(384, 768, 0.4, 0.395, this.spendAmountBuy);
    } else {
      return this.linearInterpolation(768, 2000, 0.395, 0.39, this.spendAmountBuy);
    }
  }

  private getSellExchangeRate(): number {
    if (this.spendAmountSell < 1000) {
      return this.linearInterpolation(0, 1000, 0.37, 0.37, this.spendAmountSell);
    } else if (this.spendAmountSell >= 1000 && this.spendAmountSell <= 2000) {
      return this.linearInterpolation(1000, 2000, 0.37, 0.375, this.spendAmountSell);
    } else {
      return this.linearInterpolation(2000, 4000, 0.375, 0.38, this.spendAmountSell);
    }
  }

  calculateBuy() {
    const exchangeRate = parseFloat(this.getBuyExchangeRate().toFixed(3));
    if (this.spendAmountBuy > 0) {
      this.receiveAmountBuy = (this.spendAmountBuy / exchangeRate).toFixed(2);
      this.conversionMessage = `You will receive ${this.receiveAmountBuy} USDT for ${this.spendAmountBuy.toFixed(2)} OMR at the rate of ${exchangeRate}.`;
    } else {
      this.conversionMessage = 'Please enter a valid OMR amount to buy USDT.';
    }
  }

  calculateSell() {
    const exchangeRate = parseFloat(this.getSellExchangeRate().toFixed(3));
    if (this.spendAmountSell > 0) {
      this.receiveAmountSell = (this.spendAmountSell * exchangeRate).toFixed(2);
      this.conversionMessage = `You will receive ${this.receiveAmountSell} OMR for ${this.spendAmountSell.toFixed(2)} USDT at the rate of ${exchangeRate}.`;
    } else {
      this.conversionMessage = 'Please enter a valid USDT amount to sell.';
    }
  }
}
