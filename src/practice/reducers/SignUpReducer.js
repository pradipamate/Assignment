const defaultSignUpState = [
    {
      firstname: "pradip",
      lastname: "amate",
      email: "pradipamate07@gmail.com",
      password: "test@123",
    },
  ];
  
  export default (state = defaultSignUpState, action) => {
    switch (action.type) {
      case "SIGN_UP":
        return state.concat(action.payload);
  
      default:
        return state;
    }
  };
  