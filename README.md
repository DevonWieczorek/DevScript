# DevScript
Lightweight Javascript library with jQuery dependancies.
Author: Devon Wieczorek
Release: 0.4.2
Last Updated: 3/1/2018


Languages:
- Javascript
- jQuery

Dependencies:
- jQuery

Tested in:
- Google Chrome
- Firefox
- Edge
- IE 11
- Opera

Known Limitations:
- Function chaining is not supported, therefore 'this' in certain contexts may not work
- Scroll event for simulateMobileUI is not triggered in Firefox or IE
- Console.table is not supported in Edge or IE, so console.log is used instead
- Custom log is not supported in Edge or IE

TODO:
- Figure out how to properly chain functions
- Figure out why the first call to simulateMobileUI creates another instance of the Dev object

### jQuery
DevScript can be considered an extension of the jQuery library, using it's own syntax.
jQuery is automatically installed on runtime so you'll never have to worry about forgetting to include it again.
Users can manually install their preferred version of jQuery at anytime by calling:
```javascript
$D.getjQuery('#.#.#', true);
// For example, $D.getjQuery('3.2.1', true);
```

### Mobile Responsive
The mobile-responsive meta tag is also installed on runtime so that you never have to worry about forgetting it again.
The tag that we use for mobile-responsiveness is:
```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

### Callbacks
DevScript includes it's own callback function so that you can execude your dependant code as soon as it is initialized.
The callback script can be called as such: 
```javascript
$D.afterInit(function(){ alert('Ready to go!'); });
```

### Bonus Classes
DevScript includes two other classes that are extended on runtime: Design and Hotkeys.
The design class is a subset of DevScript that contains design-specific functions, and is extended in the Dev oject itself ($D).
The Hotkeys object stands on its own and  allows you to create your own custom Hotkeys during development by using the following syntax: 
```javascript
var enterKey = new Hotkeys(13, 'enterKey', function, [arguments]);

// You can also just pass in an anonymous function and include your code to trigger inside
var enterKey = new Hotkeys(13, 'enterKey', function(){
    console.log('This gets logged when you press the enter key');
});
```

### Explore and Contribute
DevScript includes a lightweight minified file, as well as the full Javascript file which is heavily documented.
Paruse as your leisure, test it out for yourself, and PLEASE any feedback would be much appreciated!
This project was intended to be open source and I would love to see it take on a life of it's own.

### Linking to DevScript
To include the latest version of DevScript in your pages you can use the following link:
```html
<script type="text/javascript" src="https://cdn.rawgit.com/DevonWieczorek/DevScript/ab746df0/devScript.min.js"></script>
```
If you are concerned that future updates may break your code you can always link to a specific version using the following format:
```html
<script type="text/javascript" src="https://cdn.rawgit.com/DevonWieczorek/DevScript/ab746df0/0.4.2/devScript.min.js"></script>
```
