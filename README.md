# DevScript
Lightweight Javascript library with jQuery dependancies. For developers, by developers.
Author: Devon Wieczorek
Release: 0.1.0
Last Updated: 5/26/2017

Languages:
- Javascript
- jQuery

Dependencies:
- jQuery

Tested in:
- Google Chrome
- Firefox

Known Limitations:
- Function chaining is not supported, therefore 'this' in certain contexts may not work

TODO:
- Fix countup/down functions so that if no options are passed, callbacks will still work

DevScript can be considered an extension of the jQuery library, using it's own syntax.
jQuery is automatically installed on runtime so you'll never have to worry about forgetting to include it again.
Users can manually install their preferred version of jQuery at anytime by calling $D.getjQuery('#.#.#', true);
The mobile-responsive meta tag is also installed on runtime.

DevScript includes it's own callback function so that you can execude your dependant code as soon as it is initialized.
The callback script can be called as such: $D.afterInit(function(){ alert('Ready to go!'); });

DevScript includes two other classes that are extended on runtime: Design and Hotkeys.
The design class is a subset of DevScript that contains design-specific functions, and Hotkeys allows you to create your 
own custom Hotkeys during development by using the following syntax: var enterKey = new Hotkeys(13, 'enterKey', function, [arguments]);

DevScript includes a lightweight minified file, as well as the full Javascript file which is heavily documented.
Paruse as your leisure, test it out for yourself, and PLEASE any feedback would be much appreciated!
This project was intended to be open source and I would love to see it take on a life of it's own.
