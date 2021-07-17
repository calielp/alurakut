import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  body {
    font-family: sans-serif;
    background-color: #F1F9FE;
    background-image: url('https://i.pinimg.com/736x/3c/3c/0c/3c3c0c4ad6e7ff7f08b6b02dade9a7fc.jpg');
    background-color: black;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #_next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  img{
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
