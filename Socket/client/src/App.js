// Import necessary dependencies and components
import React, { useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme"; // Import theme settings
import { AllRoutes } from "./Components/AllRoutes";

const App = () => {
  // Get the mode from Redux store
  const mode = useSelector((state) => state.mode);

  // Create a theme based on the selected mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AllRoutes />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
