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
  console.log(process.env.REACT_APP_REST_API)
  // Create a theme based on the selected mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      {/* Set up the router for navigation */}
      <Router>
        {/* Apply the theme to the app */}
        <ThemeProvider theme={theme}>
          {/* Apply CSS baseline for consistent styling */}
          <CssBaseline />
          {/* Render the component responsible for handling all routes */}
          <AllRoutes />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
