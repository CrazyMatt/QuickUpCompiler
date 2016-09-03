/*
	mdmaker.js 1.0
	
	This script converts any valid QUOM (such as those made with http://www.crazymatt.net/quickup/scripts/compiler.2.1.js)
	to Markdown (found here: http://daringfireball.net/projects/markdown/syntax)
	
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

function quomToMarkdown(pageObject){
	var order = pageObject.order;
	var contents = pageObject.contents;
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
				finalAssembly += '"' + cobj.contents.text + '"';
				break;
			case "hyperlink":
				finalAssembly += "[" + cobj.contents.text + "](" + cobj.contents.url + ")";
				break;
			case "image":
				finalAssembly += "![" + cobj.contents.alt + "](" + cobj.contents.url + ")";
				break;
			case "break":
				switch(cobj.contents.mode){
					case "break":
						finalAssembly += '\n';
						break;
					case "line":
						finalAssembly += '---';
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
			case "html":
				finalAssembly += "\n\n" + cobj.contents.innerHTML + "\n\n";
				break;
			case "javascript":
				finalAssembly += "\n\n<" + "script" + ">" + cobj.contents.script + "<" + "/" + "script" + ">";
				break;
		}
	}
	
	return finalAssembly;
}