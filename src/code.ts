import { Observable } from "rxjs/Observable"

// Observale.create takes a subscribe function as argument and that
// subscribe function takes an observer as argument
var firstObservable = Observable.create(function  subscribe(observer: any) {
  // Observer.next emits a value
  observer.next("Hey guys!");
});

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

setTimeout(function() {
  observer1.unsubscribe();
  // observer2.unsubscribe();
}, 6001);