/*
	bbmaker.js 1.0
	
	BBMaker is a script that converts a QuickUp Object Model to BBCode.
	BBMaker complies with QUOMs made in http://www.crazymatt.net/quickup/scripts/compiler.2.1.js , and is built around QuickUp
	Specification 1.2 revision 1, which can be found at http://www.crazymatt.net/quickup/QuickUp1.2r1.pdf .
	
	Copyright (c) 2016 Crazymatt.net
	
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

function quomToBBCode(pageObject){
	var order = pageObject.order;
	var contents = pageObject.contents;
	var finalAssembly = "";
	
	for(var i = 0; i < order.length; i++){
		var cobj = contents[order[i]];
	
		switch(cobj.type){
			case "title":
				finalAssembly += '[size=200]' + cobj.contents.text + '[/size]\n';
				break;
			case "heading":
				finalAssembly += '[size=150]' + cobj.contents.text + '[/size]\n';
				break;
			case "text":
				finalAssembly += cobj.contents.text;
				break;
			case "quote":
				finalAssembly += '[quote]' + cobj.contents.text + '[/quote]';
				break;
			case "hyperlink":
				finalAssembly += '[url=' + cobj.contents.url + ']' + cobj.contents.text + '[/url]';
				break;
			case "image":
				finalAssembly += '[img]' + cobj.contents.url + '[/img]';
				break;
			case "break":
				switch(cobj.contents.mode){
					case "break":
						finalAssembly += '\n';
						break;
					case "space":
						finalAssembly += ' ';
						break;
					case "tab":
						finalAssembly += '   ';
						break;
					case "line":
						finalAssembly += '--------\n';
						break;
					case "nbsp":
						console.log("bbMaker.js does not currently support non-breaking spaces. A regular space was inserted instead.");
						finalAssembly += ' ';
						break;
				}
				break;
			case "html":
				console.log("bbMaker.js does not allow HTML or JavaScript to convert to bbCode as it is not widely supported or allowed.");
				break;
			case "javascript":
				console.log("bbMaker.js does not allow HTML or JavaScript to convert to bbCode as it is not widely supported or allowed.");
				break;
		}
	}
	
	return finalAssembly;
}