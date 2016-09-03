# QuickUp Compiler
Crazymatt.net QuickUp Open Source Compiler.
# Convert QuickUp into JSON or HTML
To convert a string of QuickUp to JSON, use:
```javascript
createQuickUpModel(input);
var output = JSON.stringify(page);
```
To convert a string of QuickUp to HTML (body only), use:
```javascript
createQuickUpModel(input);
var output = interpretModelToHTML(page, "body");
```
To convert a string of QuickUp to HTML (full page), use:
```javascript
createQuickUpModel(input);
var output = interpretModelToHTML(page, "full");
```
