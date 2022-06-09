let GraphemeSplitter = require("grapheme-splitter");
let fs = require("fs");

console.time("Time of operation");

/*____________________________________________________________________________________________*/

//Setup

let name1 = "Person 1"; //Your whatsapp display name 
let name2 = "Person 2"; //The other person in the chat's name

let word = "the";  //The word/character you wish to know the count of(can also be a sentence)

let clock = 0; //Set this to 3 if you use a 24hr clock, and 0 if you don't

/*____________________________________________________________________________________________*/

let text = fs.readFileSync(`./Whatsapp chat with ${name2}.txt`, "utf-8");

let messages = text.split("\n");
messages.shift();

/*____________________________________________________________________________________________*/

let name;
let len;

if(messages[0].includes(name1)) {
    len = name1.length;
}
else if(messages[0].includes(name2)) {
    len = name2.length;
}

let firstMessageAuthor = messages[0].substring(22-clock, 23+len-clock).trim();
name = firstMessageAuthor;
console.log(firstMessageAuthor)

/*____________________________________________________________________________________________*/

let names = {}; 
names[name1] = [];
names[name2] = [];

/*____________________________________________________________________________________________*/

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

}

/*____________________________________________________________________________________________*/

let splitter = new GraphemeSplitter(); 

let name1MessagesSent = names[name1].toString();
let name2MessagesSent = names[name2].toString();

let regex = /[\u0000-\u25ff\u4e00-\u9fff\uff00-\uffef\u30a0-\u30ff\ufe00-\ufe0f\u3000-\u303f★✓♪☆︻⟤⟥  ＾☚☞⟣⟢✬♛♡⻝ぁ-ゟ]/g;

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

// console.log(`\n${name1} Emoji frequency:`);
// console.table(name1EmojisSorted);

// console.log(`\n${name2} Emoji frequency:`);
// console.table(name2EmojisSorted);

// /*____________________________________________________________________________________________*/

// console.log("\n---------------------------------------------\n");
// console.log(`${name1} has sent ${splitter.countGraphemes(name1Emojis)} emojis\n`);
// console.log(`${name2} has sent ${splitter.countGraphemes(name2Emojis)} emojis\n`);
// console.log("---------------------------------------------\n");

//  /*____________________________________________________________________________________________*/

//  function countOccurences(string, word) {
//     return string.split(word).length - 1;
//  }

//  /*____________________________________________________________________________________________*/


// let wordNum = countOccurences(name1MessagesSent.toLocaleLowerCase() + name2MessagesSent.toLocaleLowerCase(),`${word}`); 
// let wordNum1 = countOccurences(name1MessagesSent.toLocaleLowerCase(),`${word}`); 
// let wordNum2 = countOccurences(name2MessagesSent.toLocaleLowerCase(),`${word}`); 

// let total_words = name1MessagesSent.split(" ").length + name2MessagesSent.split(" ").length
// let name1_words = name1MessagesSent.split(" ").length
// let name2_words = name2MessagesSent.split(" ").length

// /*____________________________________________________________________________________________*/
// let name1MessagesSentNum = names[name1].length;
// let name2MessagesSentNum = names[name2].length;
// console.log(`"${word}" has been said ${wordNum} times\n`);
// console.log(`${name1} has said "${word}" ${wordNum1} times\n`);
// console.log(`${name2} has said "${word}" ${wordNum2} times\n`);

// console.log("---------------------------------------------\n");

// console.log(`${name1} has said ${name1_words} words\n`);
// console.log(`${name2} has said ${name2_words} words\n`);
// console.log(`A total of ${total_words} words have been said\n`)

// console.log("---------------------------------------------\n");

// console.log(`${name1} has sent ${name1MessagesSentNum} messages\n`);
// console.log(`${name2} has sent ${name2MessagesSentNum} messages\n`);
// console.log(`A total of ${name1MessagesSentNum+name2MessagesSentNum} messages have been sent\n`)

// console.log("---------------------------------------------\n");

// console.timeEnd("Time of operation");

// console.log("\n---------------------------------------------\n");

// /*____________________________________________________________________________________________*/
