import { createGlobalStyle } from 'styled-components';
import '../fonts/fonts.css';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    height: 100vh;
    width: 100vw;
  }

  *, button, input{
    border: 0;
    background: none;
  }

  html{
    background: var(--background);
  }

  h1, h2, h3, h4{
    font-weight: normal;
  }

  p{
    font-size: 14px;
  }

  :root{
    --background: #F9F9F9;
    --primary: #010b15;
    --blue: #2196F3;
    --text_gray: #4F4F4F;
    --blueBackground: #407BFF;
  }
`;