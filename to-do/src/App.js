import { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import { Auth } from './containers/Auth/Auth';
import { SignUp } from './containers/SignUp/SignUp';
import { Content } from './containers/Content/Content';
import { Layout } from './HOC/Layout/Layout';
import { CreateTodo } from './containers/CreateTodo/CreateTodo';
import { MainPage } from './containers/MainPage/MainPage';
import { TodoPage } from './containers/TodoPage/TodoPage';
import { localStorageHandler } from './shared/localStorage';
import { auth } from './api/apiConfig';
import { changeTheme, themes } from './shared/appTheme';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: themes.light,
      isLoggedIn: !!localStorageHandler('getItem', 'uid'),
      notification: null,
      uid: null,
      todos: [],
    };
  }

  componentDidMount() {
    changeTheme(this.state.theme);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        localStorageHandler('setItem', 'uid', uid);
      } else {
        localStorageHandler('removeItem', 'uid');
      }

      this.setState(() => ({ isLoggedIn: !!user }));
    });
  }

  responseHandler(response) {
    if (response.error) {
      this.createNotification(response.error);
    } else if (response.uid) {
      this.setState((state) => ({
        uid: (state.uid = response.uid),
      }));
    }
  }

  createNotification(error) {
    const notification = {
      type: 'Error',
      text: error.code,
    };

    this.setState((state) => ({
      notification: (state.notification = notification),
    }));
    this.hideNotification();
  }

  hideNotification() {
    const timeout = setTimeout(() => {
      this.setState((state) => ({
        notification: (state.notification = null),
      }));
      clearTimeout(timeout);
    }, 5000);
  }

  getTodos(todos) {
    this.setState(() => ({ todos }));
  }

  render() {
    const protectedRoutes = (
      <Route path="/" element={<Content theme={this.state.theme} />}>
        <Route
          index
          element={
            <MainPage
              getTodos={(todos) => this.getTodos(todos)}
              theme={this.state.theme}
            />
          }
        />
        <Route
          path="to-do-create/:date"
          element={<CreateTodo theme={this.state.theme} />}
        />
        <Route
          path="to-do/:id"
          element={
            <TodoPage todos={this.state.todos} theme={this.state.theme} />
          }
        />
      </Route>
    );
    const unProtectedRoutes = (
      <>
        <Route
          path="/auth"
          element={
            <Auth
              responseHandler={(response) => this.responseHandler(response)}
              theme={this.state.theme}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignUp
              responseHandler={(response) => this.responseHandler(response)}
              theme={this.state.theme}
            />
          }
        />
      </>
    );
    return (
      <Layout
        isLoggedIn={this.state.isLoggedIn}
        notification={this.state.notification}
        theme={this.state.theme}
      >
        <Routes>
          {this.state.isLoggedIn ? protectedRoutes : unProtectedRoutes}
          <Route
            path="*"
            element={
              this.state.isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
        </Routes>
      </Layout>
    );
  }
}
