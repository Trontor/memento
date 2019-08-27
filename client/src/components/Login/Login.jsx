import React from "react";
import { FormHeader } from "ui/Typography";
import {
  Error,
  InputContainer,
  InputField,
  InputLabel,
  HelpText
} from "ui/Forms";
import { Logo } from "components/Logo";
import { MsgLink } from "./LoginStyles";
import { ButtonPrimary } from "ui/Buttons";
import { LoginContainer } from "./LoginStyles";
import * as yup from "yup";
import { Formik } from "formik";
import { LOGIN } from "mutations/Authentication";
import { useMutation } from "@apollo/react-hooks";

const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().required("Password is required")
});

const processAuthentication = data => {
  // Extract JWT token from response using ES6 destructuring
  const { token } = data.login;
  // Store the token to localStorage, which is NOT a secure way to store
  // sensitive information, but it is easy. See here:
  // https://www.rdegges.com/2018/please-stop-using-local-storage/
  localStorage.setItem("AUTH-TOKEN", token);
};

/**
 * To set default values for easy login during development, set the following
 * environment variables to your own memento test login details.
 * Otherwise, it will default to an empty string.
 */
const defaultValues = {
  email: process.env.REACT_APP_DEFAULT_LOGIN_EMAIL || "",
  password: process.env.REACT_APP_DEFAULT_LOGIN_PASSWORD || ""
};
export default function Login(props) {
  const [login, { loading, error, data }] = useMutation(LOGIN, {
    onCompleted: processAuthentication
  });
  if (localStorage.getItem("AUTH-TOKEN")) {
    props.history.push("/dashboard");
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  }

  return (
    <>
      <Logo />
      <LoginContainer>
        <FormHeader>Welcome back!</FormHeader>
        <Formik
          initialValues={defaultValues}
          onSubmit={(values, actions) => {
            login({ variables: { input: { ...values } } });
          }}
          validationSchema={LoginValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              {/* Email Field */}
              <InputContainer>
                <InputLabel>Email</InputLabel>
                <InputField
                  type="text"
                  name="email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                />
                {props.errors.email && props.touched.email && (
                  <Error>{props.errors.email}</Error>
                )}
              </InputContainer>
              {/* Password Field */}
              <InputContainer>
                <InputLabel>Password</InputLabel>
                <InputField
                  type="password"
                  name="password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                />
                {props.errors.password && props.touched.password && (
                  <Error>{props.errors.password}</Error>
                )}
              </InputContainer>
              <ButtonPrimary type="submit">Login</ButtonPrimary>
              <HelpText>
                Don't have an account?
                <MsgLink to="./Signup"> Sign up</MsgLink>
              </HelpText>
            </form>
          )}
        />
      </LoginContainer>
    </>
  );
}

// class Log extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//       formErrors: {
//         email: "",
//         password: ""
//       }
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     e.preventDefault();
//     const { name, value } = e.target;
//     let formErrors = this.state.formErrors;

//     switch (
//       name //sign up form validation
//     ) {
//       default:
//         break;
//       case "email":
//         formErrors.email = value.length < 1 ? "Please enter your email" : "";
//         break;
//       case "password":
//         formErrors.password =
//           value.length < 1 ? "Please enter your password" : "";
//         break;
//     }
//     this.setState({ formErrors, [name]: value }, () => console.log(this.state));
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     if (formValid(this.state)) {
//       console.log("Form Submitted");
//     } else {
//       console.error("Form Invalid");
//     }
//   }

//   render() {
//     const { formErrors } = this.state;
//     return (
//       <>
//         <Logo />
//         <LoginContainer>
//           <FormHeader>Welcome back!</FormHeader>
//           <form onSubmit={this.handleSubmit}>
//             <InputContainer>
//               <InputLabel>Email</InputLabel>
//               <InputField
//                 valid={formErrors.email.length > 0}
//                 type="text"
//                 name="email"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//               />
//               {formErrors.email.length > 0 && (
//                 <ErrorMsg>{formErrors.email}</ErrorMsg>
//               )}
//             </InputContainer>

//             <InputContainer>
//               <InputLabel>Password</InputLabel>
//               <InputField
//                 valid={formErrors.password.length > 0}
//                 type="password"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.handleChange}
//               />
//               {formErrors.password.length > 0 && (
//                 <ErrorMsg>{formErrors.password}</ErrorMsg>
//               )}
//             </InputContainer>

//             <ButtonPrimary>Login</ButtonPrimary>
//             <HelpText>
//               Don't have an account?
//               <MsgLink to="./Signup"> Sign up</MsgLink>
//             </HelpText>
//           </form>
//         </LoginContainer>
//       </>
//     );
//   }
// }
