/*
Background articles:
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
 https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
*/

/*
The task is to wake up Neo and for this we should writes thes on his console:
(in any order)
 - hey!
 - wake up!
 - Wake up, Neo... (for this we need to figure out the name)
 - hey you! wake up!

Only after all those function finish, the final message:
 - The Matrix has you...

And then the command for Neo:
(but we have to figure out the color of the rabbit):
 - Follow the white rabbit. 
*/

wakeUpNeo()
    .then(heHasAwaken)
    .then(() => getRabbitColor(followTheRabbit))
    .catch((error) => console.log('Could not wake him up!', error));

function wakeUpNeo() {
    clear();
    let promises = [];
    promises.push(nudgeWakeUp());
    promises.push(nudgeHey());
    promises.push(nudgeHeyWakeUp());
    promises.push(getHckrName(nudgeByName));
    return Promise.all(promises);
}

function nudgeWakeUp() {
    return createPromise('wake up!').then(printText);
}

function nudgeHeyWakeUp() {
    return createPromise('hey you! wake up!').then(printText);
}

function nudgeHey() {
    return createPromise('hey!').then(printText);
}

function getHckrName(nudgeHacker) {
    return createPromise(Math.floor(Math.random() * 4) ? 'Neo' : 'HackerMan')
        .then((name) => {
            console.log('Hacker name:', name);
            return nudgeHacker(name);
        });
}

function getRabbitColor(rabbitCommand) {
    return createPromise('white').then((color) => {
        console.log('Rabbit color:', color);
        rabbitCommand(color);
    });
}

function nudgeByName(name) {
    if (name !== "Neo") {
        return createPromise('Canceling wakeup...\nGo to sleep ' + name)
        .then((msg) => {
            clear();
            printText(msg);
            throw 'Unknown Hacker: ' + name;
        })
    } else {
        return createPromise(`Wake up, ${name}...`).then(printText);
    }

}

function heHasAwaken(previousMessages) {
    return createPromise('The Matrix has you...')
        .then((msg) => {
            clear();
            console.log('Previous messages that we sent before: ', previousMessages);
            return printText(msg);
        });
}

function followTheRabbit(color) {
    return createPromise(`Follow the ${color} rabbit.`).then(printText);
}

function createPromise(message) {
    return new Promise((resolvePromise, rejectPromise) => {
        console.log(`starting promise "${message}"`);
        let delay = 1000 + Math.random() * 2000
        setTimeout(() => resolvePromise(message), delay);
    });
}

