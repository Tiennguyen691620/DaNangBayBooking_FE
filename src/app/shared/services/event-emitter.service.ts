import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {

  private events = {};

  constructor() {}

  public on(eventName: string , func: any) {
    if (!(func instanceof Function)) {
      return;
    }
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(func);
  }

  public emit(eventName: string, data?: any) {
    if (this.events[eventName]) {
      for (const func of this.events[eventName]) {
        func(data);
      }
    }
  }

  // public get(eventName: string) {
  //   return this.events[eventName];
  // }

  // public off(eventName: string, func?: any) {
  //   if (this.events[eventName]) {
  //     if (func) {
  //       const index = this.events[eventName].findIndex((fc) => fc === func);
  //       if (index >= 0) {
  //         this.events[eventName].splice(index, 1);
  //       }
  //     } else {
  //       delete this.events[eventName];
  //     }
  //   }
  // }
}
