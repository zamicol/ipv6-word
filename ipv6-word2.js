var fs = require('fs');
function clean(a){
	var i, l;
	for (i = 0, l = a.length; i < l; i++) {
		a[i] = a[i].replace(/\s+/g, '');
		a[i] = a[i].replace(/\n+/g, '');
		a[i] = a[i].replace(/\r+/g, '');
	}
	return a;
}
function convertToSentence(input, words){
	var numbers = input.split(":");
	var sentence = "";
	for (var i = 0; i < numbers.length; ++i) {
		numbers[i] = parseInt(numbers[i], 16);
		sentence += words[numbers[i]];

		//Add the space
		if(i < numbers.length - 1){
			sentence += " ";
		}
	}

	return sentence;
}


function convertToIp(input, words){
	var numbers = input.split(" ");
	var sentence = [];
	var idx;
	for (var i = 0; i < numbers.length; ++i) {
		//I have no idea why this doesn't work
		// - It doesn't work because indexOf returns -1 if val
		//   in array.. and the _index_ of the value in the
		//   array if it does exist.
		idx = words.indexOf(numbers[i]);

		if (words[idx]) {
			sentence.push(idx.toString(16));
		}
	}
	return sentence.join(':');
}

if (!process.argv[2]) {
	console.log("Please pass in a ipv6 address or a sentence");
	process.exit();
}

fs.readFile('2of12inf.txt', function(e, d) {
	var words = d.toString().split('\r\n');

	if (process.argv[2].match(/\w+/)) {
		console.log(convertToIp(process.argv[2], words));
	}
	if (process.argv[2].match(/\d+/)) {
		console.log(convertToSentence(process.argv[2], words));
	}
});
