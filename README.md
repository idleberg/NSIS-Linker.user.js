# NSIS-Linker.user.js
*by Jan T. Sott*

Highlights [NSIS](http://nsis.sourceforge.net) commands in Mozilla Firefox and some other browsers. Supported are all commands in the current stable (v2.46) and alpha versions (3.0a0), plus callback functions, LogicLib, Memento, x64 and the "useful headers" FileFunc, TextFunc and WordFunc.

The user scripts triggers on the following websites:

* Winamp.com forums
* Bitbucket
* Github
* NSIS Sourceforge pages
* Stack Overflow

You can add custom domains from the Greasemonkey settings menu.

## Installation

### Firefox

1. Make sure you already have the [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) add-on installed
2. Download `NSIS-Linker.user.js`
3. Drag the downloaded file to your Firefox window or open the Add-ons window (`Ctrl+Shift+A` on Windows and Linux, `⇧⌘A` on OS X) and add the file

GreaseMonkey will automatically perform an upgrade once a new version is available!

### Chrome

1. Download `NSIS-Linker.user.js`
2. Open the extensions window from the tool menu
3. Drag the downloaded file to the extensions window

Unfortunately, the script isn't as reliable as in Firefox. If no links are created at all, please try reloading the page.

### Opera

1. Open the Preferences, go to Advanced > Content > JavaScript Options and specify a User JavaScript folder
2. Download `NSIS-Linker.user.js` to that folder

If you run into troubles, you can also try this [alternative method](http://www.howtocreate.co.uk/operaStuff/userJavaScript.html#compatibility). As future versions of Opera will be using Google's Blink engine, compatibility with this user script will like improve.

## Credits

Original AutoLink script by [Jesse Ruderman](http://www.squarefree.com), NSIS modification by [Jan T. Sott](http://whyeye.org)