import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`  
  body {
    margin: 0;
    font-family: 'IBM Plex Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  
  h1 {
    font-size: 30px !important;
  }

  h2 {
    font-size: 20px !important;;
  }

  h3 {
    font-size: 16px !important;;
  }

  p {
    font-size: 14px !important;;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p {
      margin: 0 !important;
      padding: 0;
      border: 0 !important;
      font-weight: normal !important;
  }

  /* Global <a> links */
  a:link {
      text-decoration: none;
      color: inherit;
  }

  a:visited {
      text-decoration: none;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #454545;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: grey;
  }
`;
