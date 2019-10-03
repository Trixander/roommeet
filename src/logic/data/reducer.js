export default (state = {profile: {}, houses: {}, house: {}}, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return action.data;
        case 'SET_PROFILE':
            return {...state, profile: action.data};
        case 'SET_HOUSES':
            return {...state, houses: action.data};
        case 'SET_HOUSE':
          return {...state, house: action.data};
        default:
            return state;
    }
}

/*
export default (state = false, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return action.data;
        default:
            return state;
    }
}
 */