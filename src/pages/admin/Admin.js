import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
import Topbar from "../admin/global/Topbar";
import Sidebar from "../admin/global/Sidebar";
import { Route, Routes } from "react-router-dom";
import AdDashboard from "./dashboard/index";
import AdTeam from "./team/index";
import AdPosts from "./posts/index";
import AdEvents from "./events/index";
import AdForm from "./form/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<AdDashboard />} />
              <Route path="/team" element={<AdTeam />} />
              <Route path="/posts" element={<AdPosts />} />
              <Route path="/events" element={<AdEvents />} />
              <Route path="/form" element={<AdForm />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Admin;
