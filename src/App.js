import { Main } from "./Components/Main";
import { ThemeProvider } from "./hooks/useTheme";
import { HelmetProvider, Helmet } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <title>Raj Pawan Shukla | Senior Software Engineer</title>
          <meta name="description" content="Portfolio of Raj Pawan Shukla, a Full Stack Developer specializing in Magento 2, React, and Node.js." />
        </Helmet>
        <Main />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
