import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/admin/dashboard";
import Layout from "scenes/admin/layout";
import Tests from "scenes/admin/medicalTests";
import PathologistsDashboard from "scenes/pathologists/dashboard";
import { useOrganization } from "@clerk/clerk-react";
import PathologistsLayout from "scenes/pathologists/layout";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { organization, membership, isLoaded } = useOrganization();

  if (!isLoaded || !organization) {
    return null;
  }

  const isAdmin = membership.role === "admin";

  return isAdmin ? (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tests" element={<Tests />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  ) : (
    <div className="app">
      {/* for setup of material UI */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<PathologistsLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PathologistsDashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
