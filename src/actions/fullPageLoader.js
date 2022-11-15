export const SET_SHOW_FULL_PAGE_LOADER = "SET_SHOW_FULL_PAGE_LOADER";

export const setShowFullPageLoader = (booleanValue) => (dispatch) => {
  dispatch({
    type: SET_SHOW_FULL_PAGE_LOADER,
    payload: booleanValue,
  });
};
