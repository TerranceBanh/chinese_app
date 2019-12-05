// Create questions slider4
write([
    shuffle([
        ...randomQA({
            q: 'Translate "**"',
            a: numbers,
            c: 4
        }),
        ...randomQA({
            q: 'Translate "**"',
            a: pronouns,
            c: 4
        }),
        ...randomQA({
            q: 'Translate "**"',
            a: family,
            c: 4
        }),
        ...randomQA({
            q: 'Translate "**"',
            a: color,
            c: 4
        }),
        ...randomQA({
            q: 'Translate "**"',
            a: time,
            c: 4
        })
    ]).join('')
])

// TEMPLATES
// multiChoice({
//     question: 'QUESTION.',
//     answers: [
//         {str: 'Answer 1', bool: false},
//         {str: 'Answer 2', bool: false},
//         {str: 'Answer 3', bool: true},
//         {str: 'Answer 4', bool: false},
//     ]
// })

// multiAnswer({
//     question: 'QUESTION.',
//     answers: [
//         {str: 'Answer 1', bool: true},
//         {str: 'Answer 2', bool: false},
//         {str: 'Answer 3', bool: true},
//         {str: 'Answer 4', bool: false},
//     ]
// })

// write( // FIX ANSWER CLONES
//     multiChoice({
//         question: 'QUESTION.',
//         answers: [
//             {str: randomAnswer(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], 'Answer 3'), bool: false},
//             {str: randomAnswer(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], 'Answer 3'), bool: false},
//             {str: 'Answer 3', bool: true},
//             {str: randomAnswer(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], 'Answer 3'), bool: false},
//         ]
//     })
// )

// multiAnswer({ // FIX ANSWER CLONES
//     question: 'QUESTION.',
//     answers: [
//         {str: 'Answer 1', bool: true},
//         {str: randomAnswer(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], ['Answer 3', 'Answer 1']), bool: false},
//         {str: 'Answer 3', bool: true},
//         {str: randomAnswer(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'], ['Answer 3', 'Answer 1']]), bool: false},
//     ]
// })

// multiChoice({
//     question: 'Translate "theirs (female)" in mandarin.',
//     answers: [
//         ...(() => randomAOrder({
//             rights: 'ANSWER',
//             wrongs: [ANSWER ARRAY],
//             choices: NUMBER OF ANSWERS,
//             dataKey: 'OBJECT KEY'
//         }))()
//     ]
// })

// FIX RANDOM ANSWER FOR MULTIANSWER!!!
// multiAnswer({
//     question: 'This is a question',
//     answers: [
//         ...(() => randomAOrder({
//             rights: ['零', '一'], 
//             wrongs: numbers,
//             choices: 4,
//             dataKey: 'ch'
//         }))()
//     ]
// })

// randomQA({
//     q: 'QUESTION ""',
//     a: ANSWERS ARRAY,
//     c: NUMBER OF ANSWERS
// })