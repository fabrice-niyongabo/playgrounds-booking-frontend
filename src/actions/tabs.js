export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
export const RESET_ACTIVE_TAB = "RESET_ACTIVE_TAB";

export const setAcativeTab = (tabName) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_TAB,
    payload: tabName,
  });
};

export const resetActiveTab = () => ({ type: RESET_ACTIVE_TAB });
