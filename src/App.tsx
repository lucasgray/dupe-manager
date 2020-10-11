import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { RouteProps } from "react-router";
import DupeManager, { dupes } from "./components/DupeManager";
import { Layout, Menu } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: Function) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: Function) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const App: FC = () => (
  <Router>
    <Layout>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/dupe-manager">dupe manager</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/">
              <DupeManager dupes={dupes} />
            </PrivateRoute>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </Router>
);

// function AuthButton() {
//   let history = useHistory();
//
//   return fakeAuth.isAuthenticated ? (
//       <p>
//         Welcome!{" "}
//         <button
//             onClick={() => {
//               fakeAuth.signout(() => history.push("/"));
//             }}
//         >
//           Sign out
//         </button>
//       </p>
//   ) : (
//       <p>You are not logged in.</p>
//   );
// }

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const LoginPage: FC = () => {
  let history = useHistory();
  let location = useLocation<{ from: { pathname: string } }>();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default App;
