export default (state = { availability: null, minRent: null, maxRent: null, favorites: false }, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}