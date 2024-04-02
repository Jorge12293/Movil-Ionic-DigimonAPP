import { Injectable } from '@angular/core';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class PageableService {
  private _pageable: Pageable | undefined;

  constructor() { }

  public get pageable(): Pageable | undefined {
    return this._pageable;
  }

  public set pageable(value: Pageable | undefined) {
    this._pageable = value;
  }
}
