/*
	THIS COMPILER VERSION IS NOW DEFUNCT. TO ENSURE PROPER EXECUTION, USE QUICKUP COMPILER SCRIPT 2.1.

	QuickUp Compiler Script 2.0
	
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

var page = {
	contents: {},
	order: [],
	info: {}
};

// The following function sets a QuickUp Object Model to its defaults
function setModelDefaults(pageObject){
	pageObject.contents = {};
	pageObject.order = [];
	pageObject.info.theme = "";
	pageObject.info.name = "No Name";
	pageObject.info.author = "No Author";
	pageObject.info.searchtext = "No Description";
}

// The following function breaks a QuickUp line into its command and arguments
function parseLine(line){
	var paramRegEx = /(["\'])(?:(?=(\\?))\2.)*?\1/g;
	var commandRegEx = /\w+/g;
	var breakdown = [line.match(commandRegEx)[0]];
	breakdown.push(line.match(paramRegEx));
	if(breakdown[1] != undefined){
		for(var i = 0; i < breakdown[1].length; i++){
			breakdown[1][i] = breakdown[1][i].substring(1, breakdown[1][i].length - 1);
		}
	}
	return breakdown;
}

// The following function adds an element to the QuickUp Object Model
function addElementToModel(elementType, elementContents, pageObject){
	var randomObjectName = Math.floor(Math.random() * 999999);
	pageObject.contents[randomObjectName] = {type: elementType, contents: elementContents};
	pageObject.order.push(randomObjectName);
}

// The following function retrievs the QuickUp Object Model
function retrieveModel(){
	return page;
}

function setPageInfo(pageObject, infoType, infoValue){
	pageObject.info[infoType] = infoValue;
}

function appendQuickUpModel(parsedLine, pageObject){
	switch(parsedLine[0]){
		case "theme":
			setPageInfo(pageObject, "theme", parsedLine[1][0]);
			break;
		case "name":
			setPageInfo(pageObject, "name", parsedLine[1][0]);
			break;
		case "author":
			setPageInfo(pageObject, "author", parsedLine[1][0]);
			break;
		case "searchtext":
			setPageInfo(pageObject, "searchtext", parsedLine[1][0]);
			break;
		case "comment":
			break;
		case "title":
			addElementToModel("title", {text: parsedLine[1][0]}, pageObject);
			break;
		case "heading":
			addElementToModel("heading", {text: parsedLine[1][0]}, pageObject);
			break;
		case "text":
			addElementToModel("text", {text: parsedLine[1][0]}, pageObject);
			break;
		case "quote":
			addElementToModel("quote", {text: parsedLine[1][0]}, pageObject);
			break;
		case "link":
			addElementToModel("hyperlink", {text: parsedLine[1][1], url: parsedLine[1][0]}, pageObject);
			break;
		case "image":
			addElementToModel("image", {alt: parsedLine[1][1], url: parsedLine[1][0]}, pageObject);
			break;
		case "break":
			addElementToModel("break", {mode: parsedLine[1][0]}, pageObject);
			break;
		case "html":
			addElementToModel("html", {innerHTML: parsedLine[1][0]}, pageObject);
			break;
		case "javascript":
			addElementToModel("javascript", {script: parsedLine[1][0]}, pageObject);
			break;
	}
}

function createQuickUpModel(inputQuickUp){
	var lineByLine = inputQuickUp.split('\n');
	setModelDefaults(page);
	
	for(var i = 0; i < lineByLine.length; i++){
		appendQuickUpModel(parseLine(lineByLine[i]), page);
	}
	return page;
}

function interpretModelToHTML(pageObject, outputMode){
	var order = pageObject.order;
	var info = pageObject.info;
	var contents = pageObject.contents;
	var finalAssembly = "";
	var headHTML = "";
	var bodyHTML = "";
	
	headHTML += '<title id="quickup-name">' + info.name + '</title>';
	headHTML += '<meta id="quickup-author" name="author" content="' + info.author + '">';
	headHTML += '<meta id="quickup-desc" name="description" content="' + info.searchtext + '">';
	headHTML += '<link id="quickup-theme" rel="stylesheet" type="text/css" href="' + info.theme + '">';
	
	for(var i = 0; i < order.length; i++){
		var cobj = contents[order[i]];
		
		switch(cobj.type){
			case "title":
				bodyHTML += '<h1 id="title">' + cobj.contents.text + '</h1>';
				break;
			case "heading":
				bodyHTML += '<h2>' + cobj.contents.text + '</h2>';
				break;
			case "text":
				bodyHTML += '<span id="text">' + cobj.contents.text + '</span>';
				break;
			case "quote":
				bodyHTML += '<span id="text">&quot;' + cobj.contents.text + '&quot;</span>';
				break;
			case "hyperlink":
				bodyHTML += '<a href="' + cobj.contents.url + '">' + cobj.contents.text + '</a>';
				break;
			case "image":
				bodyHTML += '<img src="' + cobj.contents.url + '" alt="' + cobj.contents.alt + '">';
				break;
			case "break":
				switch(cobj.contents.mode){
					case "break":
						bodyHTML += '<br class="quickup-break">';
						break;
					case "line":
						bodyHTML += '<hr>';
						break;
					case "space":
						bodyHTML += ' ';
						break;
					case "tab":
						bodyHTML += '&tab;';
						break;
					case "nbsp":
						bodyHTML += '&nbsp;';
						break;
				}
				break;
			case "html":
				bodyHTML += cobj.contents.innerHTML;
				break;
			case "javascript":
				bodyHTML += '<' + 'script' + '>' + cobj.contents.script + '<' + '/' + 'script' + '>';
				break;
		}
	}
	
	switch(outputMode){
		case "head":
			finalAssembly = headHTML;
			break;
		case "body":
			finalAssembly = bodyHTML;
			break;
		case "wrapped-body":
			finalAssembly = '<div id="quickup-body">' + bodyHTML + '</div>';
			break;
		case "full":
			finalAssembly = '<!DOCTYPE html><html class="quickup" data-markup="quickup" data-compiler="http://www.crazymatt.net/quickup/compiler.2.0.php"><head>'
				+ headHTML
				+ '</head><body id="quickup-body">'
				+ bodyHTML
				+ '</body></html>';
			break;
	}
	
	return finalAssembly;
}
