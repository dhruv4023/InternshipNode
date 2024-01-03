const process = require('node:process');

// 1. process.argv
console.log('Command-line arguments:', process.argv);

// 2. process.env
console.log('NODE_ENV:', process.env.NODE_ENV);

// 3. process.cwd()
console.log('Current working directory:', process.cwd());

// 4. process.chdir(directory)
process.chdir(__dirname);
console.log('Changed working directory to:', process.cwd());

// 5. process.exit()
// Uncomment the line below to exit the process with an exit code of 1
// process.exit(1);

// 6. process.on(event, callback)
process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});

// 7. process.pid
console.log('Process ID:', process.pid);

// 7. process.pid
console.log('parent Process ID:', process.ppid);

// 8. process.platform
console.log('Operating system platform:', process.platform);

// 9. process.version
console.log('Node.js version:', process.version);

// 10. process.memoryUsage()
console.log('Memory usage:', process.memoryUsage());

// 11. process.nextTick()
process.nextTick(() => {
    console.log('Callback executed in the next tick.');
});



process.stdout.write("----------------" + "\n")
process.stdout.write("hello" + "\n")
process.stdout.write("----------------" + "\n")




process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');

// Prints:
// This message is displayed first.
// Process beforeExit event with code: 0
// Process exit event with code: 0



process.on('exit', (code) => {
    setTimeout(() => {
        console.log('This will not run');
    }, 10000);
});



const { cpuUsage } = require('node:process');

const startUsage = cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log("cpuUsage: ",cpuUsage(startUsage));
// { user: 514883, system: 11226 }



const { env } = require('node:process');
env.z=1
// console.log(env.Text)