function verify(inputText){
var brackets = [{s:"(",e:")"},{s:"[",e:"]"},{s:"<",e:">"}];
if(inputText.length == 0 || getOpenBracketsIndexes(inputText,brackets).length == 0){
	return true;
}
var headStack = [];
var taleStack = [];
var currentTale = inputText;
var currentHead;
var result = true;

while(currentTale){
	var headTale = splitStr(currentTale, brackets);
	if(headTale.tale){
		headStack.push(headTale.head)
		taleStack.push(headTale.tale)
	}
	currentTale = headTale.tale;
};

for(;;){
	currentTale  = taleStack.pop();
	currentHead = headStack.pop();
	if(currentTale === undefined && currentHead === undefined){
		result = false;
		break;
	}
	var currentBracketPair = findBracketPair(currentHead[currentHead.length - 1]);
	var closeBracketIndx = currentTale.indexOf(currentBracketPair.e)
	if(closeBracketIndx < 0){
		result = false;
		break;
	}
	nextTale  = taleStack.pop();
	if(nextTale === undefined){
		break;
	}
	nextTale = nextTale.replace(currentBracketPair.s + currentTale.substring(0,closeBracketIndx + 1),"");
	taleStack.push(nextTale);
};

function findBracketPair(symb){
	for(var i = 0; i < brackets.length; i++){
		if(brackets[i].s == symb || brackets[i].e == symb){
			return brackets[i];
		}
	}
};

function splitStr(input,brackets){
	var headTale = {head: undefined, tale: undefined};
	var bracketIndexes = getOpenBracketsIndexes(input,brackets);
	if(bracketIndexes.length == 0){
		return headTale;
	}
	var minIndx = bracketIndexes[0];
	for(i = 0; i < bracketIndexes.length; i++){
		if(bracketIndexes[i] < minIndx){
			minIndx = bracketIndexes[i];
		}
	}
	headTale.head = input.substring(0,minIndx + 1);
	headTale.tale = input.substring(minIndx + 1, input.length);
	return headTale;
};

function getOpenBracketsIndexes(input, brackets){
	var bracketIndexes = [];
	for(var i = 0; i < brackets.length; i++){
		var indx = input.indexOf(brackets[i].s);
		if(indx >= 0){
			bracketIndexes.push(indx);
		}
	}
	return bracketIndexes;
};

return result;
};

console.log(verify("---(++++)----"));
console.log(verify(""));
console.log(verify("before ( middle []) after "));
console.log(verify(") ("));
console.log(verify("} {"));
console.log(verify("<( >)"));
console.log(verify("( [ <> () ] <> )"));
console.log(verify(" ( [)"));