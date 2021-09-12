const alphArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
const wsBoxes = document.querySelectorAll('.ws-box')
const srcArea = 9;
let pathArray = [];
let dic;

let randLetters = [
    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','','']
]

let counter = 0
let row = 0

console.log(alphArr.length, 'LENGTH')
wsBoxes.forEach((box, index) => {
    const randNum = Math.floor(Math.random() * alphArr.length)
    box.innerHTML = `<h2>${alphArr[randNum]}</h2>`;

    randLetters[row][counter] = alphArr[randNum]
    counter++
    if(index === 3 || index === 7 || index === 11){
        row++
        counter = 0
    }
})

const wordTrace = (row, col, newPath) => {
    let fin = false
    const newPathLetters = newPath.map(obj => obj.letter)
    const letters = newPathLetters.join('').toUpperCase()
    const found = dic.find(word => word.startsWith(letters))

    console.log('THIS IS THE NEW PATH', newPath)
    console.log('THIS IS THE NEW PATH LETTERS', letters)
    // console.log('THIS IS THE WORD WE FOUND', found)

    if(found === undefined){
        // console.log('we are returning')
        return
    }else{
        // console.log('we got in the else')
        if(col+1 < 4){
            wordSearch(row, col+1, newPath)
        }else{
            fin = true
        }
        if(row+1 < 4){
            wordSearch(row+1, col, newPath)
        } else{
            fin = true
        }
        if(row+1 < 4 && col-1 >= 0){
            wordSearch(row+1, col-1, newPath)
        } else{
            fin = true
        }
        if(row+1 < 4 && col+1 < 4){
            wordSearch(row+1, col+1, newPath)
        } else{
            fin = true
        }
        if(col-1 >= 0){
            const inPath = newPath.some(index => index.row == row && index.col == col-1 )
            if(!inPath){
            wordSearch(row, col-1, newPath)
            } else{
                fin = true
            }
        } else{
            fin = true
        }
        if(row-1 >= 0 && col-1 >= 0){
            const inPath = newPath.some(index => index.row == row-1 && index.col == col-1 )
            if(!inPath){
            wordSearch(row-1,col-1, newPath)
            } else{
                fin = true
            }
        } else{
            fin = true
        }
        if(row-1 >= 0){
            const inPath = newPath.some(index => index.row == row-1 && index.col == col )
            if(!inPath){
            wordSearch(row-1, col, newPath)
            } else{
                fin = true
            }
        } else{
            fin = true
        }
        if(row-1 >= 0 && col+1 < 4){
            wordSearch(row-1, col+1, newPath)
        } else{
            fin = true
        }


        
        if(fin){
            pathArray.push(newPath)
        }
    }
}

const wordSearch = (row, col, path=[]) => {
    if(path.length === 0){
        //Starting a word search on a certain cell
        path.push({letter: randLetters[row][col], row: row, col: col })
        const newPath = Array.from(path)
        wordTrace(row, col, newPath)
    } else{
        path.push({letter: randLetters[row][col], row: row, col: col })
        const contPath = Array.from(path)
        //check if the newly pushed letter is a word in the dictionary
        wordTrace(row, col, contPath)
    }
}

const wordFetch = async() => {
    const dictionary = await fetch('dictionary.txt')
    dic = await dictionary.text()
    dic = dic.split("\n")
    dic = dic.filter(word => word.length > 3)
}

const appExec = async() => {
    await wordFetch()
    randLetters.forEach((row, rowIndex) => {
        row.forEach((letter,letterIndex) => {
            wordSearch(rowIndex, letterIndex)
        })
    })
    console.log(pathArray)
}

appExec()

// const test = async ()=> {
//     await wordFetch()
//     console.log('DICTIONARY', dic)
//     let letters = ['a', 'a'].join('').toUpperCase()
//     const found = dic.find(word => word.startsWith(letters))
//     console.log(found)
// }

// test()
