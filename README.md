# Broccoli and Carrots

Data Structures and Algorithms in Typescript

## Overview

_Note: this is primarily for my own learning. I'll aim to keep test coverage at 100%, but I have made this to practice 1. DSA and 2. Publishing and maintaining an npm package. Test and confirm for yourself before importing and using._

## Data Structures

| Structure                           | Type     | Notes                                                                    |
| ----------------------------------- | -------- | ------------------------------------------------------------------------ |
| [Linked List][LinkedList]           | Sequence | This is a [Doubly Linked List][DoublyLinkedListWiki]                     |
| [Stack][Stack]                      | Sequence | Uses a `LinkedList` with the tail as the head of the [Stack][StackWiki]  |
| [Queue][Queue]                      | Sequence | Uses a `LinkedList` with the head as the front of the [Queue][QueueWiki] |
| [Deque (Double-ended Queue)][Deque] | Sequence | Uses a `LinkedList` with the head as the front of the [Deque][QueueWiki] |

## Algorithms

## References

[Jeff Zhang - Iruka - DSA in Typescript](https://github.com/jeffzh4ng/iruka)  
[William Fiset - Algorithms - DSA in Java](https://github.com/williamfiset/Algorithms)  
[Algorithms - Jeff Erickson](https://jeffe.cs.illinois.edu/teaching/algorithms/)

<!-- Link defs -->
<!-- Structures -->

[LinkedList]: ./src/data-structures/sequences/linked-list/index.ts
[Stack]: ./src/data-structures/sequences/stack/index.ts
[Queue]: ./src/data-structures/sequences/queues/queue/index.ts
[Deque]: ./src/data-structures/sequences/queues/deque/index.ts

<!-- Algorithms -->
<!-- Resources -->

[DoublyLinkedListWiki]: https://en.wikipedia.org/wiki/Doubly_linked_list;
[StackWiki]: https://en.wikipedia.org/wiki/Stack_(abstract_data_type)
[QueueWiki]: https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
