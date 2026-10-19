'use strict';

console.log('CAMPUS IT SUPPORT REQUEST MANAGER');


// PART A: STACK
// Stack follows LIFO (Last In, First Out).
// An array is used only as its internal storage; the END of the array is the top.
class Stack {
  // Creates the internal storage for the stack.
  constructor() {
    this.items = [];
  }

  // Adds an element to the top of the stack.
  push(element) {
    this.items[this.items.length] = element;
  }

  // Removes and returns the top element (null if the stack is empty).
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // Returns the top element without removing it (null if empty).
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Returns true when the stack has no elements.
  isEmpty() {
    return this.items.length === 0;
  }

  // Returns the number of elements in the stack.
  size() {
    return this.items.length;
  }

  // Returns all elements as text, from the bottom to the top of the stack.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART A: UNDO HISTORY');

const actionHistory = new Stack();

// Push the three required actions in the given order.
actionHistory.push('Opened Ticket #101');
actionHistory.push('Assigned Ticket #101');
actionHistory.push('Closed Ticket #101');

// Display the top action, undo it, then show what remains.
console.log('Top Action: ' + actionHistory.peek());
console.log('Undo Action: ' + actionHistory.pop());
console.log('Remaining Actions: ' + actionHistory.toString());
console.log('Stack Size: ' + actionHistory.size());


// PART B: QUEUE
// Queue follows FIFO (First In, First Out).
// An array is used only as its internal storage; index 0 is the front.
class Queue {
  // Creates the internal storage for the queue.
  constructor() {
    this.items = [];
  }

  // Adds an element at the back of the queue.
  enqueue(element) {
    this.items[this.items.length] = element;
  }

  // Removes and returns the front element (null if the queue is empty).
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  // Returns the front element without removing it (null if empty).
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  // Returns true when the queue has no elements.
  isEmpty() {
    return this.items.length === 0;
  }

  // Returns the number of elements in the queue.
  size() {
    return this.items.length;
  }

  // Returns all elements as text, from the front to the back.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART B: WAITING REQUESTS');

const waitingRequests = new Queue();

// Enqueue the four requests in their arrival order.
waitingRequests.enqueue('Ticket #201 - Password Reset');
waitingRequests.enqueue('Ticket #202 - No Internet');
waitingRequests.enqueue('Ticket #203 - Printer Problem');
waitingRequests.enqueue('Ticket #204 - Software Installation');

// Display the front request, process two requests, then show what remains.
console.log('Next Request: ' + waitingRequests.front());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Remaining Requests: ' + waitingRequests.toString());
console.log('Queue Size: ' + waitingRequests.size());


// PART C: PRIORITY QUEUE
// PriorityQueue keeps requests ordered by priority (1 = Critical, 2 = High,
// 3 = Normal). Requests with equal priority stay in arrival order.
// Per the General Rules, no array is used here: items are connected to each
// other through a "next" reference (plain objects, because the Node class
// is defined later in Part D).
class PriorityQueue {
  // Creates the internal storage (an empty chain of items).
  constructor() {
    this.first = null;
    this.count = 0;
  }

  // Inserts a request at the correct position based on its priority.
  enqueue(request, priority) {
    // Each item stores the request and its priority (plus a link to the next item).
    const item = { request: request, priority: priority, next: null };

    // Case 1: empty queue, or the new item outranks the current first item.
    // Only a strictly smaller number goes first, so equal priorities do not jump ahead.
    if (this.first === null || priority < this.first.priority) {
      item.next = this.first;
      this.first = item;
    } else {
      // Case 2: walk past every item whose priority is smaller OR EQUAL.
      // Passing equal priorities preserves arrival order.
      let current = this.first;
      while (current.next !== null && current.next.priority <= priority) {
        current = current.next;
      }
      item.next = current.next;
      current.next = item;
    }
    this.count++;
  }

  // Removes and returns the first item (null if the queue is empty).
  dequeue() {
    if (this.first === null) {
      return null;
    }
    const removed = this.first;
    this.first = removed.next;
    this.count--;
    return { request: removed.request, priority: removed.priority };
  }

  // Returns the number of items in the queue.
  size() {
    return this.count;
  }

  // Displays every request together with its priority, one per line.
  print() {
    if (this.first === null) {
      console.log('(no requests)');
      return;
    }
    let current = this.first;
    while (current !== null) {
      console.log(current.request + ', Priority ' + current.priority);
      current = current.next;
    }
  }
}

console.log('\nPART C: URGENT REQUESTS');

const urgentRequests = new PriorityQueue();

// Enqueue the four requests in their arrival order.
urgentRequests.enqueue('Ticket #301 - Install Browser', 3);
urgentRequests.enqueue('Ticket #302 - Server Offline', 1);
urgentRequests.enqueue('Ticket #303 - Faculty PC Failure', 2);
urgentRequests.enqueue('Ticket #304 - Internet Laboratory Down', 1);

// Show the initial order, process the first request, then show what remains.
console.log('Initial Priority Order:');
urgentRequests.print();

const processedUrgent = urgentRequests.dequeue();
console.log('Processed Priority Request: ' +
  processedUrgent.request + ', Priority ' + processedUrgent.priority);

console.log('Remaining Priority Requests:');
urgentRequests.print();


// PART D: LINKED LIST
// A Node holds one element and a reference to the next node.
class Node {
  // Stores the element and marks the node as the last one for now.
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// LinkedList stores completed requests as connected nodes (no arrays).
class LinkedList {
  // Starts as an empty list.
  constructor() {
    this.length = 0;
    this.head = null;
  }

  // Adds a new node at the end of the list.
  append(element) {
    const node = new Node(element);

    if (this.head === null) {
      // Empty list: the new node becomes the head.
      this.head = node;
    } else {
      // Otherwise walk to the last node and link the new node to it.
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  // Inserts an element at the given position (0 to size, inclusive).
  // Returns true on success, false when the position is invalid.
  insert(position, element) {
    // Reject invalid positions.
    if (position < 0 || position > this.length) {
      return false;
    }

    const node = new Node(element);

    if (position === 0) {
      // Insert at the beginning: new node points to the old head.
      node.next = this.head;
      this.head = node;
    } else {
      // Insert in the middle or at the end: stop at the node before the position.
      let previous = this.head;
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }
      node.next = previous.next;
      previous.next = node;
    }
    this.length++;
    return true;
  }

  // Removes and returns the element at the given position.
  // Returns null when the position is invalid.
  removeAt(position) {
    // Reject invalid positions.
    if (position < 0 || position >= this.length) {
      return null;
    }

    let removed;

    if (position === 0) {
      // Remove the head: the second node becomes the new head.
      removed = this.head;
      this.head = removed.next;
    } else {
      // Stop at the node before the one being removed, then skip over it.
      let previous = this.head;
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }
      removed = previous.next;
      previous.next = removed.next;
    }
    this.length--;
    return removed.element;
  }

  // Returns the position of the element, or -1 when it is absent.
  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  // Removes the first node holding the element (reuses indexOf and removeAt).
  // Returns the removed element, or null when it is not found.
  remove(element) {
    const index = this.indexOf(element);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  // Returns true when the list has no nodes.
  isEmpty() {
    return this.length === 0;
  }

  // Returns the number of nodes in the list.
  size() {
    return this.length;
  }

  // Traverses the list and returns all elements as text.
  // The separator defaults to ", " and can be changed (e.g. "\n" for one per line).
  toString(separator = ', ') {
    let result = '';
    let current = this.head;

    while (current !== null) {
      result += current.element;
      if (current.next !== null) {
        result += separator;
      }
      current = current.next;
    }
    return result;
  }
}

console.log('\nPART D: COMPLETED REQUESTS');

const completedRequests = new LinkedList();

// Steps 1-3: append the three required requests.
completedRequests.append('Ticket #401 - Account Activated');
completedRequests.append('Ticket #402 - Printer Connected');
completedRequests.append('Ticket #403 - Antivirus Updated');

// Step 4: insert Ticket #400 at position 0.
completedRequests.insert(0, 'Ticket #400 - Computer Diagnosed');

// Step 5: insert Ticket #405 at the end using insert().
completedRequests.insert(completedRequests.size(), 'Ticket #405 - Browser Updated');

// Step 6: display the complete list.
console.log('Complete List:');
console.log(completedRequests.toString('\n'));

// Step 7: find the index of Ticket #402.
console.log('Index of Ticket #402: ' +
  completedRequests.indexOf('Ticket #402 - Printer Connected'));

// Step 8: remove the item at position 1 using removeAt().
console.log('Removed at Position 1: ' + completedRequests.removeAt(1));

// Step 9: remove Ticket #403 by value using remove().
console.log('Removed by Value: ' +
  completedRequests.remove('Ticket #403 - Antivirus Updated'));

// Step 10: display the final list and its size.
console.log('Final List:');
console.log(completedRequests.toString('\n'));
console.log('Final Size: ' + completedRequests.size());