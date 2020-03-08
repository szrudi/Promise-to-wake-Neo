function print(text) {
    const output = document.getElementById('outputText');
    output.value += text + '\n';
}

function clear() {
    const output = document.getElementById('outputText');
    output.value = '';
}
