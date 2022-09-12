import { useReducer } from "react";

const ACTION_TYPES = Object.freeze({
    holdForms: "holdForms",
    resetForm: "resetForm",
})

function formReducer(state, action) {
    if (action.type === ACTION_TYPES.holdForms) {
        return {
            ...state,
            [action.name]: action.value, 
        }
    }
    if (action.type === ACTION_TYPES.resetForm) {
        return {
            ...action.initState,
        }
    }
}

function useForm ({ initState = {}, reducer = formReducer }) {
    const [forms, dispatch] = useReducer(reducer, initState);

    function holdForms(e) {
        const { name, value } = e.target;
        dispatch({ type: ACTION_TYPES.holdForms, name, value })
    }

    function resetForm() {
        dispatch({ type: ACTION_TYPES.resetForm, initState })
    }

    return [forms, holdForms, resetForm]
}

export { useForm, formReducer, ACTION_TYPES }