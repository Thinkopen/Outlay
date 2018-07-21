export const LOGIN_DATA = "LOGIN_DATA";

export function saveToken(logged, token) {
    return {
        type: LOGIN_DATA,
        payload: {
            logged,
            token
        }
    };
}

export default function loginData(
    state = {
        logged: false,
        token: null
    },
    action
) {
    switch (action.type) {
        case LOGIN_DATA:
            return Object.assign({}, state, {
                logged: action.payload.logged,
                token: action.payload.token
            });
        default:
            return state;
    }
}
