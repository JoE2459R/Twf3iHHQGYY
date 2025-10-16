// 代码生成时间: 2025-10-16 19:39:35
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InfiniteScrollService } from './infinite-scroll.service'; // Import the service

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  // List of data items to display
  dataItems: any[] = [];

  // Subject to emit the event to unsubscribe from all subscriptions when the component is destroyed
  private onDestroy$ = new Subject<void>();

  constructor(private infiniteScrollService: InfiniteScrollService) {}

  ngOnInit(): void {
    // Fetch the initial data set
    this.fetchData();
  }

  // Method to fetch data from the service
  fetchData(): void {
    this.infiniteScrollService.getData().pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(
      (data: any[]) => {
        // Append new data to the existing data array
        this.dataItems = [...this.dataItems, ...data];
      },
      (error) => {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    );
  }

  // Method to be called when the user scrolls to the bottom of the page
  onScroll(): void {
    // Fetch more data from the service
    this.fetchData();
  }

  // Method to unsubscribe from all subscriptions when the component is destroyed
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

/* Infinite Scroll Service
 * This service is responsible for fetching data.
 * It simulates an API call with a delay.
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollService {

  // Method to simulate fetching data from an API
  getData(): Observable<any[]> {
    return of(/* Simulated data */).pipe(
      delay(1000) // Simulate network delay
    );
  }
}