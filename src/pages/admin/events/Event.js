import { useState } from "react";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import AdEvents from "./index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import "../admin.css";
import Error from "../../Error";

function Admin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <div>
        {sessionStorage.role === "admin" ? (
          <>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <AdEvents />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          </>
        ) : (
          <>
            <Error />
          </>
        )}
      </div>
    </>
  );
}

export default Admin;
