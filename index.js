let GraphemeSplitter = require("grapheme-splitter");
let fs = require("fs");

console.time("Time of operation");

let text = fs.readFileSync("./chat.txt", "utf-8");

let messages = text.split("\n");
messages.shift();

/*____________________________________________________________________________________________*/

let name;
let len;
let name1 = "Finley Whittington";
let name2 = "Mikal Jayskoos";

let word = "The";

/*____________________________________________________________________________________________*/

if(messages[0].includes(name1)) {
    len = name1.length;
}
else if(messages[0].includes(name2)) {
    len = name2.length
}

let firstMessageAuthor = messages[0].substring(22, 23+len).trim();
name = firstMessageAuthor;

/*____________________________________________________________________________________________*/

let names = {}; 
names[name1] = [];
names[name2] = [];

/*____________________________________________________________________________________________*/

let output = 0;
for(let i = 1; i < messages.length; i++) {

    let msg = messages[i].substring(22).trimStart();

    if(msg.includes("(file attached)")) {
        continue;
    }

    if(messages[i].includes(name1)) {
        name = name1;   
        msg = msg.substr(name1.length+2);
        names[name1].push(msg);
    }

    else if(messages[i].includes(name2)) {
        name = name2;
        msg = msg.substr(name2.length+2);
        names[name2].push(msg);
    }

    if(!messages[i].includes(name1) && !messages[i].includes(name2)) {
        msg = messages[i];
        names[name].push(msg);
    }

    if(msg.toLocaleLowerCase().includes(word.toLocaleLowerCase())) {
        output += 1
    }
}

/*____________________________________________________________________________________________*/

let splitter = new GraphemeSplitter(); 

let name1MessagesSent = names[name1].toString();
let name2MessagesSent = names[name2].toString();

let regex = /[\u0000-\u25ff★✓♪＾ぁ-ゟ]/g;

let name1Emojis = name1MessagesSent.replace(regex, "");
let name2Emojis = name2MessagesSent.replace(regex, "");

/*____________________________________________________________________________________________*/

function count(s) {
    freq = {};
    for(let i of s)
        freq[i] = -~freq[i];
        return freq;
}

/*____________________________________________________________________________________________*/

name1EmojisSorted = Object.fromEntries(
    Object.entries(count(name1Emojis)).sort(([,a],[,b]) => b-a)
);
name2EmojisSorted = Object.fromEntries(
    Object.entries(count(name2Emojis)).sort(([,a],[,b]) => b-a)
);

/*____________________________________________________________________________________________*/

console.log(`\n${name1} Emoji frequency:`);
console.table(name1EmojisSorted);

console.log(`\n${name2} Emoji frequency:`);
console.table(name2EmojisSorted);

/*____________________________________________________________________________________________*/

console.log(`${name1} has sent ${splitter.countGraphemes(name1Emojis)} emojis\n`);
console.log(`${name2} has sent ${splitter.countGraphemes(name2Emojis)} emojis\n`);

/*____________________________________________________________________________________________*/

console.log(`"${word}" has been said ${output} times\n`);

console.timeEnd("Time of operation");
