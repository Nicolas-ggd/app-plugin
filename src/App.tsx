import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./utils/PrivateRoute";
import { Auth } from "./components/user-auth/Auth";
import { Page404 } from "./components/not-found-page/Page404";
import { Chat } from "./components/chat/Chat";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/chat/:id" element={<Chat />}></Route>
        </Route>
        <Route path="/" element={<Auth />}></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App
