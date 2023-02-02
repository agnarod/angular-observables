import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators'
import { count } from 'rxjs-compat/operator/count';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private listener: Subscription;

  constructor() { }


  ngOnDestroy(): void {
    this.listener.unsubscribe();
  }

  ngOnInit() {
    // this.listener = interval(1000).subscribe(
    //   count => {
    //     console.log(count);

    //   }
    // );
    const costumIntervalObs = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is to big'));
        }
        count++;
      }, 1000)
    });
    //operators
    

    //subscription
    this.listener = costumIntervalObs.pipe(filter(data=>{
      return data > 0;
    }), map( (data:number)=>{
      return 'Round: '+ (data+1);
    })).subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.log(error);
        alert(error.message);

      },
      () => {
        console.log('completed!');

      }
    );

  }

}
