// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

/*
You should have:
(in any order)
hey!
wake up!
hey you! wake up!
(only after all those function finish, the final function is called)
Wake up Neo
*/
clear();
let promises = [];
promises.push(delayMessage(nudgeWakeUp));
promises.push(delayMessage(nudgeHey));
promises.push(delayMessage(nudgeHeyWakeUp));

Promise.all(promises)
    .then(whiteRabbit)
    .catch(() => console.log('could not wake him up!'));

function delayMessage(nudge) {
    return new Promise(resolvePromise => {
        setTimeout(() => {
                const msg = nudge();
                print(msg);
                resolvePromise(msg);
            },
            500 + Math.random() * 5000
        );
    });
}

function nudgeWakeUp() {
    return 'wake up!';
}

function nudgeHeyWakeUp() {
    return 'hey you! wake up!';
}

function nudgeHey() {
    return 'hey!';
}

function whiteRabbit(previousMessages) {
    setTimeout(
        () => {
            clear();
            print('Wake up, Neo...');
            print('The Matrix has you.');
            print('');
            print(`We've sent you ${previousMessages.length} messages before.`);
            console.log('Previous message that did not wake him up: ', previousMessages);
        },
        1500);
}

function print(text) {
    const output = document.getElementById('outputText');
    output.value += text + '\n';
}

function clear() {
    const output = document.getElementById('outputText');
    output.value = '';
}
