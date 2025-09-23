// 代码生成时间: 2025-09-23 19:18:07
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// Interface for inventory items
export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// Service for inventory management
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'http://api.example.com/inventory'; // URL to web api

  constructor(private http: HttpClient) { }

  /**
   * Get all inventory items
   * @returns Observable<InventoryItem[]>
   */
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl).pipe(
      catchError(this.handleError<InventoryItem[]>('getAllItems', []))
    );
  }

  /**
   * Get inventory item by id
   * @param id The id of the item to get
   * @returns Observable<InventoryItem>
   */
  getItemById(id: number): Observable<InventoryItem> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<InventoryItem>(url).pipe(
      catchError(this.handleError<InventoryItem>(`getItemById id=${id}`))
    );
  }

  /**
   * Create a new inventory item
   * @param item The inventory item to create
   * @returns Observable<InventoryItem>
   */
  createItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl, item).pipe(
      catchError(this.handleError<InventoryItem>('createItem'))
    );
  }

  /**
   * Update an existing inventory item
   * @param item The inventory item to update
   * @returns Observable<any>
   */
  updateItem(item: InventoryItem): Observable<any> {
    const url = `${this.baseUrl}/${item.id}`;
    return this.http.put(url, item, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /**
   * Delete an inventory item by id
   * @param id The id of the item to delete
   * @returns Observable<HttpResponse<{}>>
   */
  deleteItem(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Blob>(url, this.httpOptions).pipe(
      catchError(this.handleError<Blob>('deleteItem'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

  // Provides common configuration for all HTTP requests
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}

// Component for displaying the inventory
import { Component, OnInit } from '@angular/core';
import { InventoryItem } from './inventory-management-system';
import { InventoryService } from './inventory-management-system';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  selectedItem: InventoryItem | undefined;
  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.refreshItems();
  }

  refreshItems(): void {
    this.inventoryService.getAllItems().subscribe(
      (items) => {
        this.items = items;
      },
      (error) => {
        console.error('Error fetching items:', error);
      });
  }

  onItemSelected(item: InventoryItem): void {
    this.selectedItem = item;
  }

  onCreateItem(): void {
    const newItem: InventoryItem = { id: 0, name: '', quantity: 0, price: 0 };
    this.inventoryService.createItem(newItem).subscribe(
      (item) => {
        this.items.push(item);
      },
      (error) => {
        console.error('Error creating item:', error);
      });
  }

  onUpdateItem(item: InventoryItem): void {
    this.inventoryService.updateItem(item).subscribe(
      () => {
        console.log('Item updated successfully');
      },
      (error) => {
        console.error('Error updating item:', error);
      });
  }

  onDeleteItem(item: InventoryItem): void {
    this.inventoryService.deleteItem(item.id).subscribe(
      () => {
        this.items = this.items.filter(i => i.id !== item.id);
      },
      (error) => {
        console.error('Error deleting item:', error);
      });
  }
}