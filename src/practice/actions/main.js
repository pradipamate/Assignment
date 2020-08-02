
export function Fetchingstart() {
  return (dispatch) => {
    dispatch({type:"FETCH_BEEGIN"});
    return fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: "DATA_COMPLETE", payload: data });
      });
  };
}
