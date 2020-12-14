const initialState = {
    auth: '',
    expires_at: '',
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AUTH':
            return {
                auth: action.payload,
                expires_at: action.payload,
            };
        case 'DESTORY_AUTH':
            return {
                auth: '',
                expires_at: '',
            };

        default:
            return state
    }
};
export default auth