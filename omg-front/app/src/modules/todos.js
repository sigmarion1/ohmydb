const CHANGE_INPUT = 'todos/CHANGE_INPUT'
const INSERT = 'todos/INSERT'
const TOGGLE = 'todos/TOGGLE'
const REMOVE = 'todos/REMOVE'

export const changeInput = input => ({
    type: CHANGE_INPUT,
    input
})

let id = 3

export const insert = text => ({
    type: INSERT,
    todo: {
        id: id++,
        text,
        done: false
    }
})

export const toggle = id => ({
    type: TOGGLE,
    id
})

export const remove = id => ({
    type: REMOVE,
    id
})
