import { Observable } from "rxjs/Observable"

// Observale.create takes a subscribe function as argument and that
// subscribe function takes an observer as argument
var observable = Observable.create(function  subscribe(observer: any) {
  // Observer.next emits a value
  observer.next("Hey guys!");
});

var arrowFunctObservable = Observable.create((observer: any) => {
  try {
    observer.next("Hello from arrow...");
    observer.next("This is Martin..");

    setInterval(() => {
      observer.next("Firing event...");
    }, 2000)

    // observer.complete();
    // observer.next("I am kidding. How can I be Martin?");
  } catch (err) {
    observer.error(err);
  }
});


// Subscribe to an observable using following:
let subscription = arrowFunctObservable.subscribe(
  (value: any) => {
    addItem(value);
  },
  (error: any) => addItem(error),
  () => addItem('Completed')
);

let anotherSubscription = arrowFunctObservable.subscribe(
  (value: any) => {
    addItem(value + " (from another subscription)");
  },
  (error: any) => addItem(error),
  () => addItem('Completed')
);

// To end a subscripton when another subscription is cancelled, following can be done
subscription.add(anotherSubscription);

function addItem(value: any) {
  var node = document.createElement("li");
  var textNode = document.createTextNode(value);

  node.appendChild(textNode);
  document.getElementById("output").appendChild(node);
}

setTimeout(function() {
  subscription.unsubscribe();
  // anotherSubscription.unsubscribe();
}, 6001);