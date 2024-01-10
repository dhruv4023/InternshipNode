const pattern = (x) => {
    for (let i = 0; i < x; i += 2) {
        let t = ""
        for (let j = i; j <= x; j++)
            t += " "
        for (let j = 0; j <= i; j++)
            t += "* "
        console.log(t)
    }
}
const pattern2 = (x) => {
    for (let i = x-3; i >= 0; i -= 2) {
        let t = ""
        for (let j = i; j <= x; j++)
            t += " "
        for (let j = 0; j <= i; j++)
            t += "* "
        console.log(t)
    }
}

const x = 5
pattern(x)
pattern2(x)