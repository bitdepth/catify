/** @jsxImportSource theme-ui */

import { Link, Route, Switch } from "react-router-dom";
import { ThemeProvider, Button, Flex, Text } from "theme-ui";
import { ToastProvider } from "react-toast-notifications";
import { deep } from "@theme-ui/presets";
import List from "./components/list";
import Upload from "./components/upload";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const textShadow =
  "-0.0075em 0.0075em 0 #fef2f6, 0.005em 0.005em 0 #f6a5c1, 0.01em 0.01em 0 #f7aac4, 0.015em 0.015em #f7aec7, 0.02em 0.02em 0 #f8b3ca, 0.025em 0.025em 0 #f8b7cd, 0.03em 0.03em 0 #f8bcd0, 0.035em 0.035em 0 #f9c0d3";

const customTheme = {
  ...deep,
  buttons: {
    primary: {
      "&:hover": {
        cursor: "pointer"
      }
    },
    secondary: {
      "&:hover": {
        cursor: "pointer"
      }
    }
  }
};
function App() {
  if (!localStorage.getItem("CAT_SUB_ID")) {
    localStorage.setItem("CAT_SUB_ID", nanoid());
  }

  return (
    <ThemeProvider theme={customTheme}>
      <ToastProvider>
        <Flex
          sx={{
            backgroundColor: "secondary",
            borderRadius: 100
          }}
          m={40}
        >
          <Link
            to="/"
            sx={{
              color: "mix(#fff, #e91e63, 85%)",
              textDecoration: "none"
            }}
          >
            <Text
              as="h1"
              sx={{
                color: "mix(#fff, #e91e63, 85%)",
                fontSize: [25, 50, 150],
                fontWeight: 900,
                textShadow: textShadow,
                transform: "rotate(327deg)"
              }}
            >
              Catify
            </Text>
          </Link>
          <Button
            sx={{
              flex: 1,
              borderRadius: 100
            }}
          >
            <Link
              to="/upload"
              sx={{
                color: "background",
                textDecoration: "none",
                fontSize: [20, 40, 80],
                fontFamily: "heading"
              }}
            >
              Upload
              <FontAwesomeIcon
                sx={{
                  padding: 2
                }}
                icon={faUpload}
              />
            </Link>
          </Button>
        </Flex>
        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <List />
          </Route>
        </Switch>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
