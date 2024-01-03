const os = require('os');

// os.EOL
console.log(`End of Line (EOL): ${JSON.stringify(os.EOL)}`);

// os.arch()
console.log(`Architecture: ${os.arch()}`);

// os.constants
console.log(`Operating System Constants: ${JSON.stringify(os.constants)}`);

// os.cpus()
console.log(`CPU Information: ${JSON.stringify(os.cpus())}`);

// os.devNull
console.log(`Dev Null: ${os.devNull}`);

// os.endianness()
console.log(`Endianness: ${os.endianness()}`);

// os.freemem()
console.log(`Free Memory: ${os.freemem()} bytes`);

// os.getPriority([pid])
console.log(`Process Priority (current): ${os.getPriority()}`);

// os.homedir()
console.log(`Home Directory: ${os.homedir()}`);

// os.hostname()
console.log(`Hostname: ${os.hostname()}`);

// os.loadavg()
console.log(`Load Average: ${JSON.stringify(os.loadavg())}`);

// os.machine()
console.log(`Machine: ${os.machine()}`);

// os.networkInterfaces()
console.log(`Network Interfaces: ${JSON.stringify(os.networkInterfaces())}`);

// os.platform()
console.log(`Platform: ${os.platform()}`);

// os.release()
console.log(`Release: ${os.release()}`);

// os.setPriority([pid, ]priority)
console.log('Setting Process Priority...');
os.setPriority(os.getPriority() + 1);
console.log(`New Process Priority: ${os.getPriority()}`);

// os.tmpdir()
console.log(`Temporary Directory: ${os.tmpdir()}`);

// os.totalmem()
console.log(`Total Memory: ${os.totalmem()} bytes`);

// os.type()
console.log(`Operating System Type: ${os.type()}`);

// os.uptime()
console.log(`Uptime: ${os.uptime()} seconds`);

// os.userInfo([options])
console.log(`User Information: ${JSON.stringify(os.userInfo())}`);

// os.version()
console.log(`Node.js Version: ${os.version()}`);
