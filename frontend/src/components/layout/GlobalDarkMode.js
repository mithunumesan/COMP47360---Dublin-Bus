import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  header,.container,
  body,.box2,.box1,.login-form,.journey-form select,.journey-form .btn,.journey-form .box,
.header .login-form .box,.header .login-form .remember,.journey-form .btn-save,
.header .login-form .remember label,
.header .login-form .btn ,.header .login-form,.box2 {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    
    transition: all 0.50s linear;
   
  }
  `
