/***********************************************/
// DevScript.js
// v0.5.0
// Authored/Compiled By: Devon Wieczorek
// https://github.com/DevonWieczorek/DevScript
// <script type="text/javascript" src="https://cdn.rawgit.com/DevonWieczorek/DevScript/ab746df0/devScript.min.js"></script>
/***********************************************/

'use strict';

// This will be our main class
function Dev(){
    
    // Maintain version of this script 
    this.version = '0.5.0';
    
    // Easy linkout to documentation
    this.documentation = function(){
        window.open('https://github.com/DevonWieczorek/DevScript', '_blank');
    }
    
    // Add jQuery to the document on the fly
    // @jQV - string, version of jQuery to load (ex. '3.2.1')
    // override - boolean, whether or not to override current version of jQuery if found
    // Credit: https://bgrins.github.io/devtools-snippets/
    this.getjQuery = function(jQV, override){
        jQV = jQV || '3.2.1'
        override = override || false;
        
        function fetch(){
            var dollarInUse = !!window.$;
            var s = document.createElement('script');
            s.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/' + jQV + '/jquery.min.js');
            s.addEventListener('load', function(){
                console.log('jQuery ' + jQV +' loaded!');

                if(dollarInUse) {
                    jQuery.noConflict();
                    console.log('`$` already in use; use `jQuery`');
                }
            });

            document.getElementsByTagName('head')[0].appendChild(s);
        }
        
        // If override true and jQuery exists, remove it
        if(window.jQuery && override){
            var scripts = document.getElementsByTagName("script");
            for(var i = 0; i < scripts.length; i++) {
                if (scripts[i].src.match(/jquery/)) {
                    scripts[i].parentNode.removeChild(scripts[i]);
                }
            }

            fetch();
        }
        else if ( !window.jQuery ) {
            fetch();
        }
        else{
            console.log('jQuery is already included.');
        }
    }
    
    // Make sure our page is mobile responsive
    this.makeResponsive = function(){
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width,initial-scale=1';
        document.getElementsByTagName('head')[0].appendChild(meta);
        console.log('Responsive tag has been appended.');
    }
    
    this.url = window.location.href;
    
    // Detect the browser in use
    this.browserDetect = function(){
        
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]" 
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;

        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;
        
        if(isOpera) return 'Opera';
        else if(isFirefox) return 'Firefox';
        else if(isSafari) return 'Safari';
        else if(isIE) return 'IE';
        else if(isEdge) return 'Edge';
        else if(isChrome) return 'Chrome';
        else if(isBlink) return 'Blink';
        else return 'undefined';
    }
    
    // Save the browser in use as a variable
    this.browser = this.browserDetect();
    
    // Log all of your global variables to the console
    // Useful for finding leaked global vars
    // Credit: https://bgrins.github.io/devtools-snippets/
    this.reportGlobalVars = function () {

        function getIframe() {
            var el = document.createElement('iframe');
            el.style.display = 'none';
            document.body.appendChild(el);
            var win = el.contentWindow;
            document.body.removeChild(el);
            return win;
        }

        function detectGlobals() {
            var iframe = getIframe();
            var ret = Object.create(null);

            for (var prop in window) {
                if (!(prop in iframe)) {
                    ret[prop] = window[prop];
                }
            }

            return ret;
        }

        console.log(detectGlobals());
    }
    
    // Boolean - checks if the browser supports local storage
    this.supportsLocalStorage = function(){
        if (typeof(Storage) !== "undefined") {
            return true;
        } else {
            return false;
        }
    }
    
    // Return width of Browser's scrollbar
    this.getScrollbarWidth = function() {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);        

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }
    
    // Save scrollbar width as a variable
    // Credit: https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
    this.scrollBarWidth = this.getScrollbarWidth();
    
    // Scroll element (or window) to the top of the page
    // Accepts no parameters, either, or both
    // @elem - string, class or ID or element to scroll to top
    // @speed - integer, time (in milliseconds) for the scrolling animation
    this.scrollToTop = function(elem, speed){
        
        // Allow just speed to be passed 
        if(this.isNumber(elem)){
            speed = elem;
            elem = 'html, body'
        }
        
        elem = elem || 'html, body';
        elem = $(elem);
        speed = speed || 'slow';
        
        $('html, body').animate({ scrollTop: elem.offset().top }, speed);
    }
    
    // Print the current URL, Browser, jQuery version in use, 
    // and width of browser scrollbar to the console
    this.reportInfo = function(){
        console.log('Running DevScript version ' + this.version);
        console.log('Running jQuery version ' + jQuery.fn.jquery);
        console.log('URL: ' + this.url);
        console.log('Browser: ' + this.browser);
        console.log('Supports Local Storage: ' + this.supportsLocalStorage());
        console.log('Scroll Bar: ' + this.scrollBarWidth + 'px');
    }
    
    // Returns a new Globally Unique Identifier
    this.newGUID = function() {
        var res = [], hv;
        var rgx = new RegExp("[2345]");
        for (var i = 0; i < 8; i++) {
            hv = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            if (rgx.exec(i.toString()) != null) {
                if (i == 3) { hv = "6" + hv.substr(1, 3); }
                res.push("-");
            }
            res.push(hv.toUpperCase());
        }
        value = res.join('');
        return value;
    }
    
    // Saves a cookie in the user's browser
    // @name - string, name of the cookie
    // @value - string/int, value of the cookie
    // @expires - valid dateTime string, expiration date (default is end of session)
    // @path - domain string, domain where the cookie is valid (default is calling document)
    // @secure - boolean, whether or not the cookie transmission requires a secure transmission
    this.setCookie = function(name, value, expires, path, domain, secure) {
        document.cookie= name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    }
    
    // Returns a string containing value of a specified cookie
    // Returns null if cookie does not exist
    // @name - string, name of cookie to retrieve
    this.readCookie = function(name){
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);

        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } 
        else {
            begin += 2;
        }

        var end = document.cookie.indexOf(";", begin);
        if (end == -1) end = dc.length;

        return unescape(dc.substring(begin + prefix.length, end));
    }
    
    // Deletes specified cookie from the browser
    // @name - string, name of cookie to be deleted
    // @path - string, path of the cookie (must be same as the one used to create the cookie)
    // @domain - domain string, domain of cookie (must be same as the one used to create the cookie)
    this.deleteCookie = function(name, path, domain) {
        if (this.readCookie(name)) {
            document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    }
    
    // Redirect page after specified delay
    // @url - domain string, url to redirect to
    // @delay - (optional) integer, delay (in milliseconds) before the redirect
    this.redirect = function(url, delay){
        if(!delay) delay = 0;
        setTimeout( 'window.location.href ="' + url + '"', delay);
    }
    
    // Logs all HTTP Headers to the console
    // Credit: https://bgrins.github.io/devtools-snippets/
    this.reportHTTPHeaders = function() {
        var request = new XMLHttpRequest();
        var browser = this.browser;
        request.open('HEAD', window.location, true);

        request.onload = request.onerror = function () {
            var headers = request.getAllResponseHeaders();
            var tab = headers.split("\n").map(function(h) {
                return { "Key": h.split(": ")[0], "Value": h.split(": ")[1] }
            }).filter(function(h) { return h.Value !== undefined; });
            
            // Console.table exists in Edge but "is not implemented"
            // Assume the worst for IE
            if(browser == 'Edge' || browser == 'IE' || browser == undefined || !console.table){
                console.log(headers);
            }
            else{
                console.group("Request Headers");
                console.table(tab);
                console.groupEnd("Request Headers");
            }

        };

        request.send(null);
    }
    
    // Return specified URL parameter (case insensitive)
    // Returns null if parameter is not found
    // @name - string, the parameter who's value you want to return
    // @url - (optional) string, the URL to parse for the parameter - default is current window 
    // @caseSensitive - (optional) boolean, do you want the value to be case sensitive
    this.urlParam = function(name, url, caseSensitive){
        if (!url) url = window.location.href;
        if(typeof url == 'boolean'){
            caseSensitive = url;
            url = window.location.href;
        }
        caseSensitive = caseSensitive || false;
        if(!caseSensitive){
            url = url.toLowerCase();
            name = name.toLowerCase();   
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    // Push specified parameter and value to the URL without page refresh
    // @param = string, parameter to be pushed
    // @value = string, value of parameter to be pushed
    this.pushUrlParam = function(param, value){
        var url = window.location.href;
        var char = (window.location.href.indexOf('?') > 1) ? '&' : '?';
        var newUrl = url + char + param + '=' + value;
        window.history.replaceState(null, null, newUrl);
    }
    
    // Replace the value of the specified URL param without refresh
    // Also handles cases where the parameter is not already present
    // @param = string, parameter who's value is to be replaced
    // @value = string, new value of the parameter
    this.replaceUrlParam = function(param, value){
        var url = window.location.href;
        if(value == null) value = '';
        var pattern = new RegExp('\\b('+param+'=).*?(&|$)');
        
        if(url.search(pattern)>=0){
            var newUrl = url.replace(pattern,'$1' + value + '$2');
            window.history.replaceState(null, null, newUrl);
            return true;
        }
        
        url = url.replace(/\?$/,'');
        var newUrl = url + (url.indexOf('?')>0 ? '&' : '?') + param + '=' + value;
        window.history.replaceState(null, null, newUrl);
        return true;
    }
    
    // Logs all URL queries and parameters to the console
    // Credit: https://bgrins.github.io/devtools-snippets/
    this.reportUrlParams = function() {
        var url = location;
        var querystring = location.search.slice(1);
        var tab = querystring.split("&").map(function(qs) {
            return { "Key": qs.split("=")[0], "Value": qs.split("=")[1], "Pretty Value": decodeURIComponent(qs.split("=")[1]).replace(/|/g," ") }
        });

        // Console.table exists in Edge but "is not implemented"
        // Assume the worst for IE
        if(this.browser == 'Edge' || this.browser == 'IE' || this.browser == undefined || !console.table){
            console.log("URL: " + url + "\nQueries:  " + querystring);
            console.log(tab)
        }
        else{
            console.group("Querystring Values");
            console.log("URL: " + url + "\nQueries:  " + querystring);
            console.table(tab);
            console.groupEnd("Querystring Values");
        }
    }
    
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    // @func - function, function to be called after the timeout
    // @wait - integer, timeout before the function is called
    // @immediate - boolean, call the function before the timeout is set
    // Credit: https://davidwalsh.name/javascript-debounce-function
    this.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Use browser's native ability to validate an email string
    // @string - string, email address to be tested
    // Credit: https://davidwalsh.name/essential-javascript-functions
    this.isValidEmail = function(string){
        string = string||'';
        var lastseg = (string.split('@')[1]||'').split('.')[1]||'',
            input = document.createElement('input');
            input.type = "email";
            input.required = true;
            input.value = string;
        return !!(string && (input.validity && input.validity.valid) && lastseg.length);
    }
    
    // Escapes an HTML element and just returns the inner text
    // @html - HTML tags to be stripped ex. '<div> lorem ipsum </div>'
    this.stripHTML = function(html) {  
        return html.replace(/<(?:.|\n)*?>/gm, ''); 
    }
    
    // Removes breaking spaces from a string
    // @str - string, string to remove spaces from
    this.removeSpaces = function(str){
        return str.replace(/\s+/g, '');
    }
    
    // Capitalize the first letter of each word in a string
    // JS equivalent of CSS's text-transform: capitalize;
    // @str - string, string to be capitalized
    // @options - JSON object, to capitalize hyphenated words or lowercase all caps words
    // Credits: https://www.simoahava.com/gtm-tips/10-useful-custom-javascript-tricks/
    // https://stackoverflow.com/questions/7874626/how-to-capitalize-each-word-even-after-hyphens-with-jquery
    this.capitalize = function(str, options){
        var settings = $.extend({
            hyphens: true, // Capitalize hyphenated words
            forceCase: false // Force words in all caps to be first letter caps only
        }, options);
        
        str = settings.forceCase ? str.toLowerCase() : str;
        
        if(settings.hyphens){
            return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
            function(firstLetter){
                return firstLetter.toUpperCase();
            });
        }
        else{
            var newArr = [];
            var arr = str.split(' ');
            
            for(var i = 0; i < arr.length; i++){
                newArr.push(arr[i].replace(/^./, arr[i].substring(0,1).toUpperCase()));
            }
            
            return newArr.join(' ');
        }
    }
    
    // Blink an HTML element at a set interval, JS version of the old <blink> tag
    // @el - string, the class or ID of the element you would like to blink
    // @t - integer, the full duration of the blink (from initial state to when it is shown again)
    this.blink = function(el, t){
        el = $(el);
        el.css('opacity', '0');
        setTimeout(function(){ 
            el.css('opacity', '1'); 
            setTimeout(function(){ $D.blink(el, t) }, (t/2));
        }, (t/2));
    }
    
    // Blink only the text inside an element, JS version of the old <blink> tag
    // @el - string, the class or ID of the element who's text you would like to blink
    // @t - integer, the full duration of the blink (from initial state to when it is shown again)
    this.blinkText = function(el, t){
        el = $(el);
        var txt = el.text();
        el.text('');
        setTimeout(function(){ 
            el.text(txt); 
            setTimeout(function(){ $D.blinkText(el, t) }, (t/2));
        }, (t/2));
    }
    
    // Automatically restores functionality to <blink> and <blinkText> tags
    this.supportBlink = function(){
        // Bring back the <blink> tag!
        if (this.exists('blink')) this.blink('blink', 2000);
        // Support <blinkText> tag too!
        if (this.exists('blinkText')) this.blinkText('blinkText', 2000);
    }
    
    // Return whether or not the input is a number (or numerical string)
    // @n - string or integer, input to test whether or not it is only numeric
    this.isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // Return whether or not the input is only alphabetical
    // @n - string, string to test for numberical values or special chars
    this.isAlpha = function(n){
        n = n.toString();
        return (n != undefined && n.search(/[^A-Za-z\s]/) == -1);
    }
    
    // Returns whether or not a given element exists in the document
    // @elem - string, class or ID to check for
    this.exists = function(elem){
        elem = $(elem);
        return elem.length > 0;
    }
    
    // Returns whether or not there is only one of a given element
    // @elem - string, class or ID to check for duplicates
    this.isUnique = function(elem){
        elem = $(elem);
        return elem.length == 1;
    }
    
    // Returns whether or not there is more than one of a given element
    // @elem - string, class or ID to check for duplicates
    this.isDuplicate = function(elem){
        elem = $(elem);
        return elem.length > 1;
    }
    
    // A more specific implementation of Javascript's native typeof
    // Returns whether the argument is a: object, array, arguments, error, date, regex, math, json, number, string, or boolean
    // @obj - the entity to be tested for it's true type
    // Credit: https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
    this.isType = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    
    // Returns array of only objects of a given operand from an array
    // Operands are number, string, boolean, symbol, undefined, object, array, function, and null
    // By default does not include arrays or nulls as objects
    // @type - string, type of operands to return
    // @arr - array, array to sort through
    this.onlyType = function(type, arr){
        var newArr = [];
        type = type.toLowerCase();
        
        arr.forEach(function(item) {
            // Arrays are objects, but are treated as their own operand in this function
            if(type == 'array' && Array.isArray(item)){
                newArr.push(item);
            }
            // Null is also treatd like an object, treat it as it's own operand
            else if(type == 'null' && item == null){
                newArr.push(item);
            }
            // Don't return arrays or nulls if looking for objects
            else if(type == 'object' && typeof item === type){
                if(!Array.isArray(item) && item !== null) newArr.push(item);
            }
            else if (typeof item === type) {
                newArr.push(item);
            }
        });
        
        return newArr;
    }
    
    // Returns a random number within a specified range (inclusive)
    // @min - integer, minimum number to return
    // @max - integer, maximum number to return
    this.randomNumber = function(min, max){
        min = min || 0;
        max = max || 10;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Returns whether a number is even or odd
    // @num - integer, number to test
    this.isEven = function(num){
        return num % 2 == 0;
    }
    
    // Returns whether a number is divisible by three
    // @num - integer, number to test
    this.isTriplet = function(num){
        return num % 3 == 0;
    }
    
    // Returns whether a number is divisible by 10
    // @num - integer, number to test
    this.isDecibel = function(num){
        return num % 10 == 0;
    }
    
    // Returns the ordinal (st, nd, rd, th) for a given number
    // @num - integer, number to associate ordinal with
    this.ordinal = function(num){
        var teen = false;
        var ones = num.toString().slice(-1);
        var tens = num.toString().slice(-2, -1);
        
        if(tens == '1') teen = true;
        
        if(ones == '1' && !teen) return 'st';
        else if(ones == '2' && !teen) return 'nd';
        else if(ones == '3' && !teen) return 'rd';
        else return 'th';
    }
    
    // Prints a count up timer to a given element
    // @elem - string, class or ID to check for duplicates
    // @options - JSON object, choose what to show and what not to show
    // @timeout - integer, time (in millisecons) to end the counter
    // @callback - function, callback function to execute after timeout is reached
    this.countUp = function(elem, options, timeout, callback){
        
        var settings = $.extend({
            seconds: true, // Show seconds
            minutes: true, // Show minutes
            hours: false, // Show hours
            days: false, // Show days
            showZeros: true // Show leading zeros when that increment is empty
        }, options);
        
        // Allow options to be skipped without passing empty object
        if(this.isNumber(options)){
            callback = timeout;
            timeout = options;
        } 
        
        elem = $(elem);
        timeout = timeout / 1000; // Convert timeout to seconds
        
        var seconds = 0;
        var minutes = '0' + 0;
        var hours = '0' + 0;
        var days = '0' + 0;
        var timeString = '';
        
        var cu = setInterval(function(){
            seconds++;

            if(seconds < 10) seconds = '0' + seconds;
            
            if (seconds == 60){
                seconds = '0' + 0;
                minutes++;
                if(minutes < 10) minutes = '0' + minutes;
            }
            
            if (minutes == 60){
                minutes = '0' + 0;
                hours++;
                if(hours < 10) hours = '0' + hours;
            }
            
            if (hours == 24){
                hours = '0' + 0;
                days++;
                if(days < 10) days = '0' + days;
            }
            
            if(settings.showZeros){
                if(settings.seconds) timeString = seconds;
                if(settings.minutes) timeString = minutes + ':' + timeString;
                if(settings.hours) timeString = hours + ':' + timeString;
                if(settings.days) timeString = days + ':' + timeString;
            }
            else{
                if(settings.seconds) timeString = seconds;
                if(minutes > 0 && settings.minutes) timeString = minutes + ':' + timeString;
                if(hours > 0 && settings.hours) timeString = hours + ':' + timeString;
                if(days > 0 && settings.days) timeString = days + ':' + timeString;
            }

            elem.html(timeString.toString());  
            
            if(timeout && seconds == timeout){
                clearInterval(cu);
                callback();
            }
        },1000);
    }
    
    // Countdown with option to show timer and optional callback function
    // @elem - string, class or ID of the element to print to (defaults to body)
    // @options - JSON object, choose what to show and what not to show
    // @duration - int (in milliseconds), start of the time clock (total duration of the timer)
    // @callback - function, optional callback to be called after the timer ends
    // Credit for the time logic: https://www.w3schools.com/howto/howto_js_countdown.asp
    this.countDown = function(elem, duration, callback, options){
        
        var settings = $.extend({
            seconds: true, // Show seconds
            minutes: true, // Show minutes
            hours: false, // Show hours
            days: false, // Show days
            showZeros: true // Show leading zeros when that increment is empty
        },options);
        
        var now = 0;
        var timeString = '';
        elem = $(elem) || $('body'); // Default to body
        duration = duration || 60000; // Default to 60 seconds
        
        // Allow options to be passed in without a callback
        if(typeof callback !== 'function'){
            options = callback;
            callback = '';
        }

        // Update the count down every 1 second
        var cd = setInterval(function() {

            // Calculate the time left
            var distance = duration - now;
            now += 1000;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(days < 10) days = '0' + days;
            if(hours < 10) hours = '0' + hours;
            if(minutes < 10) minutes = '0' + minutes;
            if(seconds < 10) seconds = '0' + seconds;

            if(settings.showZeros){
                if(settings.seconds) timeString = seconds;
                if(settings.minutes) timeString = minutes + ':' + timeString;
                if(settings.hours) timeString = hours + ':' + timeString;
                if(settings.days) timeString = days + ':' + timeString;
            }
            else{
                if(settings.seconds) timeString = seconds;
                if(minutes > 0 && settings.minutes) timeString = minutes + ':' + timeString;
                if(hours > 0 && settings.hours) timeString = hours + ':' + timeString;
                if(days > 0 && settings.days) timeString = days + ':' + timeString;
            }

            // Output the result in the given element
            elem.html(timeString.toString());
            
            // If the count down is over, clear interval and execute callback
            if (distance == 0) {
                clearInterval(cd);
                if(callback) callback();
            }

        }, 1000);
    }
    
    // Simulate native browser elements for mobile devices
    // Appends elements to the window to simulate the native UI elements on mobile browsers
    // Binds a scroll event to the window to change the dimensions of the elements on scroll
    // @os - the os who's elements you want to simulate (iOS or Android), case insensitive
    this.simulateMobileUI = function(os){
        // Clear any UI elements before adding new ones
        this.removeMobileUI();
        
        os = os.toLowerCase();
        var top = (os == 'ios') ? '64px' : '88px';
        var bottom = (os == 'ios') ? '44px' : '56px';
        var topDiv = '<div id="' + os + '-UI-Top" class="mobile-UI-Element"></div>';
        var bottomDiv = '<div id="' + os + '-UI-Bottom" class="mobile-UI-Element"></div>';
        var topScrolled = (os == 'ios') ? '40px' : '32px';

        // Create and style UI elements
        $('body').wrapInner('<div id="mobile-UI-Test-Wrapper" style="position: relative; width: 100% !important; height: 100%; !important"></div>');

        $('#mobile-UI-Test-Wrapper').prepend(topDiv);
        $('#mobile-UI-Test-Wrapper').append(bottomDiv);
        
        // Append styles to the body with !important so they don't get overridden
        var wrapperCSS = '#mobile-UI-Test-Wrapper{';
                wrapperCSS += 'box-sizing: border-box !important; overflow: scroll !important;';
                wrapperCSS += 'padding-top: ' + top + ' !important;';
                wrapperCSS += 'padding-bottom: ' + bottom + ' !important;';
            wrapperCSS += '}';
        this.insertCSS(wrapperCSS);
        
        var uiCSS = '#' + os + '-UI-Top, #' + os + '-UI-Bottom{';
            uiCSS += 'width: 100% !important; background: #000 !important; position: fixed !important; left: 0px !important; z-index: 99999 !important;}'
        this.insertCSS(uiCSS);

        // Allow styles to be overridden on the scroll event
        $('#' + os + '-UI-Top').css({'height': top, 'top': '0px'});
        $('#' + os + '-UI-Bottom').css({'height': bottom, 'bottom': '0px'});

        // Find fixed elements and offset them appropriately
        var innerItems = document.getElementsByTagName("*");
        for (var i = innerItems.length; i--;) {
            if($(innerItems[i]).css('position') == 'fixed'){
                // Don't off position the UI elements
                if(!$(innerItems[i]).hasClass('mobile-UI-Element')){
                    var tORb;
                    var h = $('#mobile-UI-Test-Wrapper').height();
                    var t = parseInt($(innerItems[i]).css('top'));

                    // Determine whether to fix to top or bottom
                    ((h/2) > t) ? tORb = 'top' : tORb = 'bottom';

                    if(tORb == 'top'){
                        $(innerItems[i]).css('top', (t + parseInt(top)) + 'px');
                    }
                    else{
                        var b = parseInt($(innerItems[i]).css('bottom'));
                        $(innerItems[i]).css('bottom', (b + parseInt(bottom)) + 'px');
                    }    
                }
            }
            
            //Bind the scroll event
            $(window).on('scroll', function () {
                var lastScrollTop = 0;
                var st = $('body').scrollTop();
                if (st > lastScrollTop){
                    $('#' + os + '-UI-Top').css({'height': topScrolled});
                    $('#' + os + '-UI-Bottom').hide();
                } 
                else {
                    $('#' + os + '-UI-Top').css({'height': top});
                    $('#' + os + '-UI-Bottom').show();
                }
                lastScrollTop = st;
            });
        }
    }
    
    // End the mobile UI simulation
    // Removes the appended UI elements
    // Removes the scroll event from the window
    this.removeMobileUI = function(){
        var cnt = $('#mobile-UI-Test-Wrapper').contents();
        $('#mobile-UI-Test-Wrapper').replaceWith(cnt);
        $('.mobile-UI-Element').remove();
        $(window).off('scroll');
    }
    
    // Extend Dev with other classes
    this.extendDev = function(){
        Design.call(this);
    }
    
    // Constructor function
    this.construct = function(){
        //this.preInit();
        this.getjQuery(); // Fetch jQuery, then... the magic begins
        this.makeResponsive();
        this.extendDev();
        this.reportInfo();
        this.afterInit();
        this.supportBlink();
    }

    // Custom callback after the $D object has been created
    // Ex. $D.afterInit(function(){ alert('$D has been loaded!') });
    this.afterInit = function(callFirst){ if(callFirst) callFirst(); }
    
    // Construct self
    this.construct();
    
} // End dev class


// Create class to set hotkeys to trigger functions
// @key - integer, keycode of the hotkey you want to create
// @shortName - string, local name of the hotkey'ed function within the Hotkey object
// @paramFunc - function, function to be called on hotkey (can also be anonymous)
// @args - array, an array of arguments passed to the hotkey'ed function
// If setting hotkeys within afterInit:
// this.enterKey = new Hotkeys(13, 'enterKey', this.shadeColor, ['#a3a3a3',50]);
// Or if setting within your own code:
// var enterKey = new Hotkeys(13, 'enterKey', $D.shadeColor, ['#a3a3a3',50]);
// Or var enterKey = new Hotkeys(13, 'enterKey', function(){ doStuff(); });
// Best practice to set shortname to the name of your instance of Hotkeys (i.e. enterKey)
function Hotkeys(key, shortName, paramFunc, args){
	var scope = this;
    this.key = key;
    this.shortName = shortName;
    this.paramFunc = paramFunc;
    this.args = args;

    this.checkKey = function(e){
        var e = e || window.event; // for IE to cover IEs window event-object
        if(e && e.keyCode == key){
            e.preventDefault();
            scope.shortName = paramFunc.apply(scope, args);
        }
    }

    $(document).keyup(this.checkKey);
}


// Create a separate class for design-specific methods/properties
function Design(){
    
    // Return RGBA value from RGB value
    // @rgb, valid rgb string to convert to rgba
    // @opacity - decimal, 0.1 - 1.0, the "a" value
    this.rgbToRGBA = function(rgb, opacity){
        var color = rgb.split('(')[1].split(')')[0];
        var rgba = 'rgba(' + color + ', ' + opacity + ')';
        return rgba.toString();
    }
    
    // Return RGB Value of a Hex color
    // @rgb - valid rgb string to convert to a Hex value
    this.rgbToHEX = function(rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }
    
    // Return Hex Value of a RGB(A) color
    // @hex - valid Hex string to convert to a RGB value
    // @opacity - (optional) decimal from 0.1 to 1.0 (the "a" value)
    this.hexToRGBA = function(hex, opacity){
        hex = hex.replace('#','');
        var r = parseInt(hex.substring(0,2), 16);
        var g = parseInt(hex.substring(2,4), 16);
        var b = parseInt(hex.substring(4,6), 16);
        
        if(opacity) var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
        else var result = 'rgb(' + r + ',' + g + ',' + b + ')';
        
        return result;
    }

    // Return a complementary color for any given hex code
    // @color - valid hexidecimal string, the base color to be shaded
    // @percent - integer, the percent to shade the base color by (accepts negative values)
    this.shadeColor = function(color, percent){
        var R = parseInt(color.substring(1, 3), 16);
        var G = parseInt(color.substring(3, 5), 16);
        var B = parseInt(color.substring(5, 7), 16);
        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);
        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;
        var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
        var currentColor = "#" + RR + GG + BB;
        console.log(currentColor);
        return currentColor;
    }
    
    // Return cross-browser css for linear gradient
    // @deg - integer, the direction of the gradient
    // @start - valid hex or rgb(a) string, start color for gradient
    // @stop - valid hex or rgb(a) string, end color for gradient
    this.linearGradient = function(deg, start, stop){
        var style = [];
        var gt = (deg <= 45 || (deg >= 135 && deg < 226) || deg >= 315) ? 1 : 0;
        
        var fallback = 'background: ' + start + ';';
        var moz = 'background: -moz-linear-gradient(' + deg + 'deg, ' + start +' 0%, ' + stop +  ' 100%);'
        var webkit = 'background: -webkit-linear-gradient(' + deg + 'deg, ' + start + ' 0%, ' + stop +' 100%);'
        var op = 'background: -o-linear-gradient(' + deg + 'deg, ' + start + ' 0%, ' + stop +' 100%);'
        var ms = 'background: -ms-linear-gradient(' + deg + 'deg, ' + start + ' 0%, ' + stop +' 100%);'
        var w3c = 'background: linear-gradient(' + deg + 'deg, ' + start + ' 0%, ' + stop +' 100%);'
        var ie = "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='" + start + "', endColorstr='" + stop + "',GradientType=" + gt + " );"
        
        console.log(fallback+'\n'+moz+'\n'+webkit+'\n'+op+'\n'+ms+'\n'+w3c+'\n'+ie);
        style = [fallback, moz, webkit, op, ms, w3c, ie];
        return style;
    }
    
    // Set the gradient background for an element (cross-browser)
    // @elem - string, the class or ID of the element(s) to style
    // @deg - integer, the direction of the gradient (in degrees)
    // @start - valid hex or rgb(a) string, start color for gradient
    // @stop - valid hex or rgb(a) string, end color for gradient
    this.setLinearGradient = function(elem, deg, start, stop){
        elem = $(elem) || this;
        var styles = this.linearGradient(deg, start, stop);
        
        for(var i = 0; i < styles.length; i++){
            var p = styles[i].split(': ')[0].toString();
            var s = styles[i].split(': ')[1].toString();
                s = s.split(';')[0];
            elem.css(p, s);
        }
        return elem;

    }
    
    // Return cross-browser css for radial gradient
    // @start - valid hex or rgb(a) string, start color for gradient
    // @stop - valid hex or rgb(a) string, end color for gradient
    this.radialGradient = function(start, stop){
        var style = [];
        
        var fallback = 'background: ' + start + ';';
        var moz = 'background: -moz-radial-gradient(center, ellipse cover, ' + start +' 0%, ' + stop +' 100%);'
        var webkit = 'background: -webkit-radial-gradient(center, ellipse cover, ' + start + ' 0%, ' + stop + ' 100%);'
        var op = 'background: -o-radial-gradient(center, ellipse cover, ' + start + ' 0%, ' + stop + ' 100%);'
        var ms = 'background: -ms-radial-gradient(center, ellipse cover, ' + start + ' 0%, ' + stop + ' 100%);'
        var w3c = 'background: radial-gradient(ellipse at center, ' + start + ' 0%, ' + stop + ' 100%);'
        var ie = "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='" + start + "', endColorstr='" + stop + "',GradientType=1 );"
        
        console.log(fallback+'\n'+moz+'\n'+webkit+'\n'+op+'\n'+ms+'\n'+w3c+'\n'+ie);
        style = [fallback, moz, webkit, op, ms, w3c, ie];
        return style;
    }
    
    // Set the gradient background for an element (cross-browser)
    // @elem - string, the class or ID of the element(s) to style
    // @start - valid hex or rgb(a) string, start color for gradient
    // @stop - valid hex or rgb(a) string, end color for gradient
    this.setRadialGradient = function(elem, start, stop){
        elem = $(elem) || this;
        var styles = this.radialGradient(start, stop);
        
        for(var i = 0; i < styles.length; i++){
            var p = styles[i].split(': ')[0].toString();
            var s = styles[i].split(': ')[1].toString();
                s = s.split(';')[0];
            elem.css(p, s);
        }
        return elem;
    }
    
    // Center an element vertically and horizontally within it's parent
    // Makes the parent element relative position, 
    // Then absolutely positions the targeted element and centers it
    // @elem - string, the class or ID of the element(s) to center
    this.center = function(elem){
        elem = $(elem) || this;
        var w = elem.width();
        var h = elem.height();
        var p = elem.parent();
        var top = 'calc((100% - ' + h + 'px)/2)';
        var left = 'calc((100% - ' + w + 'px)/2)';
        
        p.css('position','relative');
        elem.css({
            'position': 'absolute',
            'top': top,
            'left': left,
            'right': 'auto',
            'bottom': 'auto'
        });
        return elem;
    }
    
    // Center an element horizontally within it's parent
    // Makes the parent element relative position, 
    // Then absolutely positions the targeted element and centers it
    // @elem - string, the class or ID of the element(s) to center
    this.centerHorizontal = function(elem){
        elem = $(elem) || this;
        var w = elem.width();
        var p = elem.parent();
        var left = 'calc((100% - ' + w + 'px)/2)';
        
        p.css('position','relative');
        elem.css({
            'position': 'absolute',
            'left': left,
            'right': 'auto',
        });
        return elem;
    }
    
    // Center an element vertically and horizontally within it's parent
    // Makes the parent element relative position, 
    // Then absolutely positions the targeted element and centers it
    // @elem - string, the class or ID of the element(s) to center
    this.centerVertical = function(elem){
        elem = $(elem) || this;
        var h = elem.height();
        var p = elem.parent();
        var top = 'calc((100% - ' + h + 'px)/2)';
        
        p.css('position','relative');
        elem.css({
            'position': 'absolute',
            'top': top,
            'bottom': 'auto'
        });
        return elem;
    }
    
    // Set an element's font-family to the default system font of the device in use
    // Uses a font stack to determine the first available font family
    // @elem - string, the class or ID of the element(s) to be styled
    this.systemFont = function(elem){
        elem = $(elem) || this;
        elem.css('font-family', '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif');
        return elem;
    }
    
    // Inject a new style tag with CSS rules to the end of the body
    // @rule - string, the CSS rules to be added (must be valid CSS syntax)
    // Credit: https://css-tricks.com/snippets/javascript/inject-new-css-rules/
    this.insertCSS = function(rule){
        var div = $("<div />", {
            html: '&shy;<style>' + rule + '</style>' //&shy; included for IE9 quirks
        }).appendTo("body");    
    }
    
    // Style your console.logs for a more custom development experience
    // @style - string, style to be applied to the console.log
    // @msg - string, the message to log
    // Credit: https://raygun.com/blog/useful-javascript-debugging-tips-you-didnt-know/
    this.customLog = function(style, msg){
        console.log('%c%s', style, msg);
    }
    
} // End design class


// Create our dev object on runtime
var $D = new Dev();
var $d = $D; // Make alias case insensitive
