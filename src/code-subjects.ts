import { Subject } from "rxjs/Subject";

// Subject is just another type of Observables. More specifically, it can emit values as well
// as act as an observer i.e. its an Observable and an Observer simultaneously.
var subject = new Subject();

subject.subscribe(
  data => addItem("Observer 1: " + data),
  err => addItem(err),
  () => addItem("Observer 1 completed")
);

subject.next("First item is sent...");

var observer2 = subject.subscribe(
  data => addItem("Observer 2: " + data)
);

// Second observer will get following two emitted values but not the first emitted value
// because that value was emitted before the second observer got created as you may see above
subject.next("Second item is sent...");
subject.next("Third item is sent...");

observer2.unsubscribe();

// As we have unsubscribed observer2 above, therefore, following event will be recieved by
// only observer 1 (which is still observing emitted values).
subject.next("A final thing has been sent");

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

