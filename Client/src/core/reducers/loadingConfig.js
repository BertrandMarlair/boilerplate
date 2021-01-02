export const initialState = {
    isLoading: false,
    reportName: null,
    processing: null,
};

export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const CLOSE_LOADING = "CLOSE_LOADING";
export const SET_PROCESSING = "SET_PROCESSING";

export default function LoadingReducer(state = initialState, {type, payload}) {
    switch (type) {
        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
                reportName: payload,
            };
        case CLOSE_LOADING:
            return {
                ...state,
                isLoading: false,
                reportName: null,
                processing: null,
            };
        case SET_PROCESSING:
            return {
                ...state,
                processing: payload,
            };
        default:
            return state;
    }
}
