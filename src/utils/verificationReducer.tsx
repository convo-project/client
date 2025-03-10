export const initialState = {
  verificationError: null as string | null,
  verificationSuccess: null as string | null,
};

type Action = { type: "SET_ERROR"; payload: string } | { type: "SET_SUCCESS"; payload: string } | { type: "RESET" };

export const verificationReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        verificationError: action.payload,
        verificationSuccess: null,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        verificationSuccess: action.payload,
        verificationError: null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
