import { Observable } from 'rxjs/Observable';
import { merge } from "rxjs/observable/merge";

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

