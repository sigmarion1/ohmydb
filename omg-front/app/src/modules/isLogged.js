
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

export const increase = () => ({ type: INCREASE })
export const decrease = () => ({ type: DECREASE })

const SIGN_IN = 'isLogged/SIGN_IN'

export const sign_in = () => ({ type: SIGN_IN})

const loggedReducer = (state = false, action) => {
    switch(action.type) {
        case SIGN_IN:
            return !state
        default:
            return state
    }
}



export default loggedReducer  