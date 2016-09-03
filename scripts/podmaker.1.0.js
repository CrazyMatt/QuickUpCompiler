/*
	podmaker.js 1.0
	
	POD Maker is a script that converts a QuickUp Object Model to Perl "Plain Old Documentation"
	POD Maker complies with QUOMs made in http://www.crazymatt.net/quickup/scripts/compiler.2.1.js , and is built around QuickUp
	Specification 1.2 revision 1, which can be found at http://www.crazymatt.net/quickup/QuickUp1.2r1.pdf . If you have any
	suggestions to improve POD Maker, post them here: http://www.crazymatt.net/forum/viewtopic.php?f=13&t=4#top .
	
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

function quomToPod(pageObject){
	var order = pageObject.order;
	var contents = pageObject.contents;
	var finalAssembly = "";
	
	finalAssembly += "=pod\n";
	
	for(var i = 0; i < order.length; i++){
		var cobj = contents[order[i]];
		
		switch(cobj.type){
			case "title":
				finalAssembly += "=head1 " + cobj.contents.text + "\n";
				break;
			case "heading":
				finalAssembly += "=head2 " + cobj.contents.text + "\n";
				break;
			case "text":
				finalAssembly += "=begin text\n" + cobj.contents.text + "\n=end text\n";
				break;
			case "quote":
				finalAssembly += "=begin text\nE<quot>" + cobj.contents.text + "E<quot>\n=end text\n";
				break;
			case "hyperlink":
				finalAssembly += "=begin text\n" + cobj.contents.text + "(" + cobj.contents.url + ")" + "\n=end text\n";
				break;
			case "image":
				finalAssembly += "=begin text\n" + cobj.contents.alt + "(" + cobj.contents.url + ")" + "\n=end text\n";
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
						finalAssembly += 'E<Tab>';
						break;
					case "nbsp":
						finalAssembly += 'E<nbsp>';
						break;
				}
				break;
			case "html":
				finalAssembly += "=begin html\n" + cobj.contents.innerHTML + "\n=end html\n";
				break;
		}
	}
	
	finalAssembly += "=cut";
	
	return finalAssembly;
}