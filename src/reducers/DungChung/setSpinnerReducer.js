var initState = -1;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SPINNER_DATABASE':
            return 1;
        case 'NO_SPINNER_DATABASE':
            return 0;
        default:
            return state;
    }
}

export default noidung;