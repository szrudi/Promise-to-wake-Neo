function printText(text) {
    const output = document.querySelector('#outputText');
    output.value += text + '\n';
    return text;
}

function clear() {
    const output = document.querySelector('#outputText');
    output.value = '';
}
