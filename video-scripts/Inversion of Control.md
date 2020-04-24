Inversion of Control
====================

## Intro

Hi, in this video I'm going to explain the actual meaning of *IoC* - short for inversion of control - and possible implementations of such a feature.


## Terminology

Before I start with examples, I want to quickly pay close attention to the words that make up the term "inversion of control".

First, we have *inversion*, which is just a fancy way to say change, or flip. Next time you are making burgers and are flipping the patties, you could also say you inverted your patties. Everyone's gonna look at you like an alien, but at least I'm done explaining the inversion part of the term.

Now the control part. Whenever you have control, it means that it is your decision on what happens next. In software, we are executing code, one instruction at a time - I'm going to ignore parallel processing for simplicities sake - and the currently executing piece of your software basically has control over what's going to happen.


## Summary

So inversion of control in software terms means, that the way the software is designed results in a change of what portion of the code is in charge about what's going to happen next.

Consider two functions in JavaScript. On one hand, we have a function, that reads user input and calls another function.
The called function is the second piece and makes an asynchronous request to a server, and then outputs the response payload to the DOM.
But maybe... there will be other places, where we want to make the same request, but do something different with the output.
So let's quickly create a callback parameter.

Whooooops! We already did it. Instead of the request function having control over how the response payload is handled, we just passed this control to our caller. We've just inverted the control.

Nowadays, there is IoC everywhere. Even our first code revision used IoC to get the response payload back. We told jQuery to make a request, and it handed the control back to us, by calling the callack function we supplied.

Event Loops, Dependency Injection and similar structures are all inverting control.
Event Loops let arbitrary listeners take control about handling events and dependency injection frameworks take control over the instantiation of objects so your code doesn't have to.


## Conclusion

Inversion of control isn't nearly as complicated as it might sound. At the end of the day, it's about being able to rearrange your code, so you can reuse it for multiple scenarios.

That sounds great, so we should do this for everything right? Let's invert the world!

No no no. As in real life, sometimes you have to take control yourself. That's where the meat of your program will be. You cannot delegate control away forever. At some point, stuff needs to happen. An implementation must be present.

So as always, use it where you need to.


## Outro

Thank you for watching this video till the end. If you liked it, why not press the inverted thumbs-down button?
