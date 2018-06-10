import { Observable } from "rxjs/Observable";
import { fromEvent } from "rxjs/observable/fromEvent";

// Observale.create takes a subscribe function (also called a Producer) as argument and that
// subscribe function takes an observer as argument
var firstObservable = Observable.create(function  subscribe(observer: any) {
  // Observer.next emits a value
  observer.next("Hey guys!");
});

// Cold Observable
// ---------------------------------------------------------------------------------------------
// Above mentioned Observer and following are both examples of Cold Observables. A Cold
// Observable is an observalble which gets activated when its subscription is created.
// In other words, cold observable is an observable whose producer is inside the observable.
// Whenever a new subscription is created, it will recieve same values even if the subscription
// was created at a later time
var secondObservalble = Observable.create((observer: any) => {
  try {
    observer.next("Hello from arrow...");
    observer.next("This is Martin..");

    setInterval(() => {
      observer.next("Firing event...");
    }, 2000)

    // Commenting following as otherwise above mentioned events of interval come to an end almost immediately
    // because of observer.complete()
    // observer.complete();
    // observer.next("I am kidding. How can I be Martin?");
  } catch (err) {
    observer.error(err);
  }
});


// Subscribe to an observable using following:
let observer1 = secondObservalble.subscribe(
  (value: any) => {
    addItem(value);
  },
  (error: any) => addItem(error),
  () => addItem('Completed')
);

// We can have multiple subscribers / observers, observing the same Observable
let observer2 = secondObservalble.subscribe(
  (value: any) => {
    addItem(value + " (from another subscription/observer)");
  },
  (error: any) => addItem(error),
  () => addItem('Completed')
);

// To end a subscripton when another subscription is cancelled, following can be done
// or we can just unsubscribe second observer separately.
observer1.add(observer2);

// Unsubscribe both cold observables after 6 seconds
setTimeout(function() {
  observer1.unsubscribe();
  // observer2.unsubscribe();
}, 6001);


// Hot Observable
// ---------------------------------------------------------------------------------------------
// An Observable is hot when the producer is emitting values outside of the Observable. A truly
// hot observable is one which emits values without having a subscriber, subscribe to it. An
// example would be mouse movements by user

var hotObservable = fromEvent(document.getElementById("moveMouseDiv"), 'mousemove');
setTimeout(() => {
  hotObservable.subscribe(
    (value: any) => addItem(value)
  )
}, 8000)


/**
 * Add a value to DOM
 * @param value Value to be added to DOM
 */
function addItem(value: any) {
  var node = document.createElement("li");
  var textNode = document.createTextNode(value);

  node.appendChild(textNode);
  document.getElementById("output").appendChild(node);
}

