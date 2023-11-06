import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { UserProvider } from "./context/UserContext";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#044cf4" },
        components: {
          Segmented: {
            itemSelectedBg: "#044cf460",
            itemSelectedColor: "white",
          },
        },
      }}
      locale={ptBR}
    >
      <BrowserRouter>
        <UserProvider>
          <Router />
        </UserProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
