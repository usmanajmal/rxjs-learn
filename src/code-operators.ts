import { Observable } from 'rxjs/Observable';
import { merge } from "rxjs/observable/merge";
import "rxjs/add/operator/map";

import { from } from 'rxjs/Observable/from';
import "rxjs/add/operator/pluck";

// Operators act on observables or subjects and return a new observable. They don't change
// the observables on which they are called. That is why they are regarded as Pure Functions
// as they do not change variables outside of their own scope
//
// There are two types of Operators:
//
// 1. Instance Operators:
//      Accounts for majority of RxJS operators. They are called on instances of observables
// 2. Static Operators:
//      Usually used to create observables

// Merge Operator
// ---------------------------------------------------------------------------------------------
var observable1 = Observable.create((observer: any) => {
  observer.next("Hey guys...");
});

var observable2 = Observable.create((observer: any) => {
  observer.next("How is it goooooing!");
});

var newObserver = merge(observable1, observable2);
newObserver.subscribe(
  (x) => addItem(x)
);


// Map Operator
// ---------------------------------------------------------------------------------------------
Observable.create((observer: any) => {
  observer.next("I am in lower case guys...(but a map operator may transform me)");
})
  .map((x: any) => x.toUpperCase())
  .subscribe((x: any) => addItem(x));


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


// Pluck Operator (and observable created via 'from')
// ---------------------------------------------------------------------------------------------

from([
  { 'firstName': 'Usman', 'lastName': 'Ajmal', 'Age': 32},
  { 'firstName': 'Mike', 'lastName': 'Kite', 'Age': 32},
  { 'firstName': 'Ali', 'lastName': 'Usman', 'Age': 32}
])
  .pluck('firstName')
  .subscribe((x: any) => addItem(x));