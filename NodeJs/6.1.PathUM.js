const path = require('node:path');

// x=path.win32.basename('d:\\temp\\myfile.html');
// console.log(x)
// // Returns: 'myfile.html'



// // console.log(process.env.PATH);
// // Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'

// x=process.env.PATH.split(path.delimiter);
// console.log(x)
// // Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']

x = path.dirname('/foo/bar/baz/asdf/quux');
console.log(x)
// Returns: '/foo/bar/baz/asdf'


// extension -----------------------------------------------

// console.log(path.extname('index.html'))
// Returns: '.html'

// console.log(path.extname('index.coffee.md'))
// Returns: '.md'

// console.log(path.extname('index.'))
// Returns: '.'

// console.log(path.extname('index'))
// Returns: ''

// console.log(path.extname('.index'))
// Returns: ''

// console.log(path.extname('.index.md'))
// Returns: '.md'

console.log(path.format({
    dir: 'C:\\path\\dir',
    base: 'file.txt',
}));
// Returns: 'C:\\path\\dir\\file.txt'

console.log(path.isAbsolute('tmp.txt')) // false
console.log(path.isAbsolute('U:\\AlphavedInternship\\tmp.js')) // true

console.log(path.join(__dirname + "\\tmp.txt"))


console.log(path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'))
// Returns: 'C:\\temp\\foo\\bar'


console.log(path.parse('d:\\files\\project\\tmp.txt'))
// Returns:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }


console.log('foo\\bar\\baz'.split(path.sep))
// Returns: ['foo', 'bar', 'baz']