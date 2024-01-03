const { spawn } = require('child_process');

const ls = spawn('ls', ['-l', '-a']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});


const { exec } = require('node:child_process');
exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});


if (process.argv[2] === 'child') {
    setTimeout(() => {
        console.log(`Hello from ${process.argv[2]}!`);
    }, 1_000);
} else {
    const { fork } = require('node:child_process');
    const controller = new AbortController();
    const { signal } = controller;
    const child = fork(__filename, ['child'], { signal });
    console.log(child.pid)
    child.on('error', (err) => {
        // This will be called with err being an AbortError if the controller aborts
    });
    controller.abort(); // Stops the child process
}
