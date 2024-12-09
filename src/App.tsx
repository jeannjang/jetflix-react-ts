import { GlobalStyle } from "./styles/globalStyle";
import { ThemeProvider } from "styled-components";
import { Theme } from "./styles/theme/theme";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./AppRouter";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  );
}

export default App;

//jetflix
