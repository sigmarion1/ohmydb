
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

export const increase = (nr) => ({ type: INCREASE, payload: nr })
export const decrease = () => ({ type: DECREASE })

const initialState = {
    number: 0
}

const counter = (state=initialState, action) => {
    switch (action.type) {
        case INCREASE:
            return {
                number: state.number + action.payload
            }
        case DECREASE:
            return {
                number: state.number - 1
            }
        default:
            return state
    }
}

export default counter