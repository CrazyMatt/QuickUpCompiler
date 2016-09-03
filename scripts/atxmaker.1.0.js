/*
	atxmaker.js 1.0
	
	This script converts any valid QUOM (like ones made in http://www.crazymatt.net/quickup/scripts/compiler.2.1.js)
	to ATX. The description and syntax of ATX can be found here: http://www.aaronsw.com/2002/atx/intro (or here:
	http://web.archive.org/web/20160817085454/http://www.aaronsw.com/2002/atx/intro , if for some reason the site
	vanishes.
	
	In the ATX documentation, it uses a definition system for links. This is the method of links that I will support.
	For example,
	
	   [John] http://www.example.com
	   [the market] http://www.example.org
	   [John] went to [the market].
	   
	Generates
	
	   <a href="http://www.example.com">John</a> went to <a href="http://www.example.org">the market</a>.
	
	If anyone has any suggestions, post them here: http://www.crazymatt.net/forum/viewtopic.php?f=13&t=5
	
	This converter is built off of the QuickUp Specification 1.2 revision 1, found here:
	http://www.crazymatt.net/quickup/QuickUp1.2r1.pdf
	
	Copyright (c) 2016 Crazymatt.net.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
	documentation files (the "Software"), to deal in the Software without restriction, including without limitation
	the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
	and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of this Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
	THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
*/

function quomToATX(pageObject){
	var order = pageObject.order;
	var contents = pageObject.contents;
	var linkDefs = "";
	var finalAssembly = "";
	
	for(var i = 0; i < order.length; i++){
		var cobj = contents[order[i]];
	
		switch(cobj.type){
			case "title":
				finalAssembly += "# " + cobj.contents.text + "\n";
				break;
			case "heading":
				finalAssembly += "## " + cobj.contents.text + "\n";
				break;
			case "text":
				finalAssembly += cobj.contents.text;
				break;
			case "quote":
				finalAssembly += "``" + cobj.contents.text + "''";
				// I'm not sure this is correct, but its listed in the documentation...
				break;
			case "hyperlink":
				linkDefs += "[" + cobj.contents.text + "] " + cobj.contents.url + "\n";
				finalAssembly += "[" + cobj.contents.text + "]";
				break;
			case "image":
				console.log("The ATX documentation says nothing about images. This script will just treat them like links.");
				linkDefs += "[" + cobj.contents.alt + "]" + cobj.contents.url + "\n";
				finalAssembly += "[" + cobj.contents.alt + "]";
				break;
			case "break":
				switch(cobj.contents.mode){
					case "break":
						finalAssembly += '\n';
						break;
					case "line":
						finalAssembly += '--------\n';
						break;
					case "space":
						finalAssembly += ' ';
						break;
					case "tab":
						finalAssembly += '&Tab;';
						break;
					case "nbsp":
						finalAssembly += '&nbsp;';
						break;
				}
				break;
		}
	}
	
	finalAssembly = linkDefs + finalAssembly;
	
	return finalAssembly;
}