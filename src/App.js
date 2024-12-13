import "./App.css";
import { Container } from "@mui/material";
import Main from "./component/Main";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5%",
      }}
    >
      <Container maxWidth="xl">
        <Main />
      </Container>
    </div>
  );
}

export default App;
