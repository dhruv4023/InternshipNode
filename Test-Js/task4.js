const printPattern = (rows) => {
    for (let i = -rows + 1; i < rows; i += 2) {
        let t = "";
        const spaces = Math.abs(i) / 2;
        for (let j = 0; j < spaces; j++)
            t += "  ";
        for (let j = 0; j < rows - Math.abs(i); j++)
            t += "* ";
        console.log(t);
    }
}

const numberOfRows = 7;

printPattern(numberOfRows);
