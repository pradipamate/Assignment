import React from "react";
import { Row, Col, Button,Container } from "react-bootstrap";
import { connect } from "react-redux";
import Main from "./Main";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lemail: "",
      Lpassword: "",
      login: "no",
    };
  }

  handle_Lemail = (event) => {
    this.setState({ Lemail: event.target.value });
  };

  handle_Lpassword = (event) => {
    this.setState({ Lpassword: event.target.value });
  };

  Login = () => {
    var allUsers = this.props.signUpData;
    function search(nameKey, allUsers) {
      for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === nameKey) {
          return allUsers[i];
        }
      }
    }
    var resultObject = search(this.state.Lemail, allUsers);
    if (resultObject != undefined) {
      if (
        resultObject.email == this.state.Lemail &&
        resultObject.password == this.state.Lpassword
      ) {
        alert("Login Successfuly");
        this.setState({ login: "yes" });
      } else {
        alert("login failed");
        this.setState({ login: "not" });
      }
    } else {
      alert("please use valid credentials");
    }
    //console.log(resultObject,"loogin user details")
    this.setState({ Lemail: "", Lpassword: "" });
  };

  render() {
    return (
      
       <Row className="custom_row"  style={{ border: "15px solid rgb(111, 201, 217)", color: "#2a283d" }} >
        {this.state.login == "yes" ? (
          <Container>
            <Row>
                <Main />
             </Row>
          </Container>
        ) : (
          <Container>
          <div>
            <p
              style={{ textAlign: "center", padding: "10px", color: "#2a283d" }}
            >
              Use these credentials for login username :{" "}
              <strong>pradipamate07@gmail.com</strong> And password :{" "}
              <strong>test@123</strong>
            </p>
            <Row className="custom_row form" style={{ background: "#2a283d" }}>
              <Col md={12} className="text-center login" id="loginbtn">
                <h2 className="text-center"> Login </h2>
              </Col>
              <div id="login">
                <Col md={12}>
                  <input
                    type="text"
                    onChange={this.handle_Lemail}
                    value={this.state.Lemail}
                    placeholder="Username"
                  />
                  <input
                    type="password"
                    onChange={this.handle_Lpassword}
                    value={this.state.Lpassword}
                    placeholder="Password"
                  />
                  <Button
                    type="submit"
                    className="btn btn-info getstart text-center"
                    onClick={this.Login}
                  >
                    Login
                  </Button>
                </Col>
              </div>
            </Row>
          </div>
          </Container>
        )}
      </Row>
    );
  }
}

const mapStatetToProps = (state) => {
  console.log("state from form", state);
  return {
    signUpData: state.SignUp,
  };
};

export default connect(mapStatetToProps)(Form);
