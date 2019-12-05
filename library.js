`use strict`
// Detect array of property key and use multiAnswer instead of multichoice
// Give a choice between multiAnswer or multiChoice or randomization of both
const write = str => document.write(str)
const getName = name => document.getElementsByName(name)
const getClass = className => document.getElementsByClassName (className)
const getId = id => document.getElementById(id)
const isString    = value => typeof value === 'string' || value instanceof String
const isArray     = value => typeof value === 'object' && value.constructor === Array
const isUndefined = value => typeof value === 'undefined'
const isNumber    = value => typeof value === 'number' && isFinite(value)
const isObject    = value => typeof value === 'object' && value.constructor === Object && value
const shuffle = (a) => {// Shuffles arrays
    // a = array
    // v = value
    // cI = current index
    // rI = random index
    let cI = a.length, 
        v, 
        rI;

    while (0 !== cI) {// While there remain elements to shuffle...
      // Pick a remaining element...
      rI = Math.floor(Math.random() * cI);
      cI -= 1;
  
      // And swap it with the current element.
      v = a[cI];
      a[cI] = a[rI];
      a[rI] = v;
    }
  
    return a;
}
const multiChoice = ({ question, answers }) => {
    if (!isArray(answers)) {
        console.log('"answers" requires array data type')
        return
    }
    else if (!isString(question)) {
        console.log('"question" requires string data type')
        return
    }
    else if (answers.length < 2) {
        console.log('"answers" requires more than 1 element')
        return
    }
    else {
        for (let i = 0; i < answers.length; i++) {
            if (!isObject(answers[i])) {
                console.log('"answers" array elements are required to be objects')
                return
            }
        }
    }
    qHash++
    return(`
        <fieldset class="question" oninput="(() => {
            ${(() => {// Generates a value to outputs array index per question
                let str = ''
                for (let i = 0; i < answers.length; i++) {
                    str += `if (q${qHash}a${i}.checked) ${(() => {
                        if (answers[i].bool) return `outputs[${qHash-1}] = 1;`
                        else return `outputs[${qHash-1}] = 0;`
                    })()}`
                }
                return str
            })()}
        })()">
            <legend>Question <span name="qNum"></span> / <span name="qTotal"></span></legend>
            <p>${question}</p>
            ${(() => {// Generates radio inputs
                let str = '' 
                for (let i = 0; i < answers.length; i++) {
                    if (answers[i].bool === true) {
                        str += `
                            <div 
                                class="right" 
                                onclick="document.getElementById('q${qHash}a${i}').checked = true"
                            >
                                <input type="radio" name="q${qHash}" id="q${qHash}a${i}">
                                <label for="q${qHash}a${i}">${answers[i].str}</label><br>
                            </div>
                        `
                    }
                    else {
                        str += `
                            <div 
                                class="wrong" 
                                onclick="document.getElementById('q${qHash}a${i}').checked = true"
                            >
                                <input type="radio" name="q${qHash}" id="q${qHash}a${i}">
                                <label for="q${qHash}a${i}">${answers[i].str}</label><br>
                            </div>
                        `
                    }
                }
                return str
            })()}
        </fieldset>
    `)
}

const multiAnswer = ({ question, answers }) => {
    // There should be only 1 question
    // There should be at least 2 answers to choose from
    // Should check for an array of objects in answers
    qHash++
    return(`
        <fieldset oninput="(() => {
            ${(() => {
                let str = ''
                str += `outputs[${qHash-1}] = 0;`
                for (let i = 0; i < answers.length; i++) {
                    str += `if (q${qHash}a${i}.checked) ${(() => {
                        if (answers[i].bool) return `outputs[${qHash-1}] = outputs[${qHash-1}] + 1;`
                        else return `{outputs[${qHash-1}] = 0; return null;}`
                    })()}`
                }
                return str
            })()}
        })()">
            <legend>Question ${qHash} / <span name="qTotal"></span></legend>
            <p>${question}</p>
            ${(() => {
                let str = '' 
                for (let i = 0; i < answers.length; i++) {
                    str += `
                        <input type="checkbox" name="q${qHash}" id="q${qHash}a${i}">
                        <label for="q${qHash}a${i}">${answers[i].str}</label><br>
                    `
                }
                return str
            })()}
        </fieldset>
    `)
}

const randomAnswer = (arr, a) => { //FIX ANSWER CLONES
    if (isArray(arr)) {
        console.log('"arr" requires array data type')
        return
    }
    let num
    let func1 = () => { // 
        num = Math.floor(Math.random() * arr.length)
        if (num < 0) func1()
    }
    func1()

    let func2 = () => {
        if (arr[num] === a) {func1(); func2();}
    }
    func2()
    return arr[num]
}

const randomAOrder = ({ rights, wrongs, choices, dataKey}) => { // Figure out a better algorithm to better randomize the right answer
    let r1, r2
    let wrongsTemp = (() => JSON.parse(JSON.stringify(wrongs, null, 4)))() // To make direct copy instead of reference
    if (isString(rights) || isNumber(rights)) {
        let arr = []
        let b = false
        let func1 = () => {
            for (let i = arr.length; i < choices; i++) {
                r1 = Math.round(Math.random() * 1)
                r2 = Math.floor(Math.random() * wrongsTemp.length)
                if (r1 === 1 && b === false) {
                    b = true
                    arr.push({ str: rights, bool: true })
                }
                else if (rights !== wrongsTemp[r2][dataKey]){
                    arr.push({ str: wrongsTemp[r2][dataKey], bool: false})
                    wrongsTemp.splice(r2, 1)
                }
                else {
                    wrongsTemp.splice(r2, 1)
                }
            }
            if (arr.length < choices) {func1()}          
        }
        func1()
        let func2 = () => {
            let answerExists = false
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].str === rights) answerExists = true
            }
            if (!answerExists) {
                let r3 = Math.floor(Math.random() * arr.length)
                arr.splice(r3, 1, { str: rights, bool: true })
            }
        }
        func2()
        return arr
        
    }
    else if (typeof rights === 'object' && rights.constructor === Array) {
        let arr = []
        let b = false
        for (let i = arr.length; i < wrongsTemp.length;) {
            r1 = Math.round(Math.random() * 1)
            r2 = Math.floor(Math.random() * wrongsTemp.length)
            r3 = Math.floor(Math.random() * rights.length)
            if (r1 === 1 && b === false) {
                arr.push({ str: rights[r3], bool: true })
                rights.splice(r3, 1)
                wrongsTemp.splice(wrongsTemp.indexOf(rights[r3]), 1)
                if (rights.length === 0) b = true
            }
            else if (rights[r3] !== wrongsTemp[r2][dataKey]) {
                arr.push({ str: wrongsTemp[r2][dataKey], bool: false})
                wrongsTemp.splice(r2, 1)
            }
        }
        return arr
    
    }
}

const randomQA = ({ q, a, c }) => { // Requires multiple choice
    // Create Choice Range
    // Create Question Types

    //　Restructures Data
    const arrs = {} 
    for (let obj = 0; obj < a.length; obj++) {
        for (const key in a[obj]) {
            if (typeof arrs[key] === 'undefined') {            
                arrs[key] = []
                arrs[key].push(a[obj][key])
            }
            else {
                arrs[key].push(a[obj][key])                
            }
        }        
    }

    // Extracts Property Keys
    const keys = (() => {
        let arr = []
        for (const key in arrs) {
            arr.push(key)
        }
        return arr
    })()

    // Generates Questions & Answers
    let q2
    let qa = []
    for (let i = 0; i < keys.length; i++) {// loop tier for questions based on answers
        for (const key in arrs) {// loop tier for finding key of property
            for (let j = 0; j < arrs[key].length; j++) {// loop tier for generating and adding questions into array
                q2 = q
                q2 = q2.replace('**', `${arrs[keys[i]][j]}`)
                if (arrs[keys[i]][j] !== arrs[key][j]) {
                    qa.push(
                        multiChoice({
                            question: q2,
                            answers: [
                                ...(() => randomAOrder({
                                    rights: arrs[key][j],
                                    wrongs: a,
                                    choices: c,
                                    dataKey: key
                                }))()
                            ]
                        })
                    )
                }
            }
        }
    }
    return qa
}
