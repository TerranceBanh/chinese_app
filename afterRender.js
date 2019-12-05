const submit = getName('submit')
const reset = getName('reset')
const right = getClass('right')
const wrong = getClass('wrong')
const question = getClass('question')
for (let i = 0; i < submit.length; i++) {
    submit[i].addEventListener("click", (e) => {
        e.preventDefault()
        if (outputs.length < 1) return
        total.innerText = outputs.reduce((x , y) => x + y)
        for (let i = 0; i < right.length; i++) {
            right[i].style.backgroundColor = 'green'
            right[i].style.color = 'white'
            if (right[i].childNodes[1].checked === true) {
                question[i].style.backgroundColor = 'lightgreen'
            }
            else {
                question[i].style.backgroundColor = 'tomato'
            }
        }
        for (let i = 0; i < wrong.length; i++) {
            if (wrong[i].childNodes[1].checked === true) {
                wrong[i].style.backgroundColor = 'red'
                wrong[i].style.color = 'white'
            }
        }
    })
    reset[i].addEventListener("click", (e) => {
        total.innerText = ""
        outputs = []
    })
}

const qNum = getName('qNum')
for (let i = 0; i < qNum.length; i++) {
    qNum[i].innerText = [i+1]
}

const qTotal = getName('qTotal')
for (let i = 0; i < qTotal.length; i++) {
    qTotal[i].innerText = qTotal.length    
}
