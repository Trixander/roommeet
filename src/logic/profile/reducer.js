export default (state = { name: 'Sarah Murphy', age: '22.99999999', houses: [{name: 'Property Name', location: 'IDK Middleton'}, {name: 'Work', location: 'IDK Madison'}]}, action) => {
    switch (action.type) {
        case 'FFFFFF_PROFILE':
            return action.profile;
        default:
            return state;
    }
}