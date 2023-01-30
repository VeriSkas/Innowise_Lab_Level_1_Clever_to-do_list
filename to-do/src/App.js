import { Component } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import Auth from '@pages/Auth/Auth';
import SignUp from '@pages/SignUp/SignUp';
import { Content } from '@pages/Content/Content';
import { Layout } from '@components/Layout/Layout';
import CreateTodo from '@pages/CreateTodo/CreateTodo';
import MainPage from '@pages/MainPage/MainPage';
import TodoPage from '@pages/TodoPage/TodoPage';
import { localStorageHandler } from '@utils/localStorage';
import { auth } from '@queries/apiConfig';
import { changeTheme, themes } from '@constants/appTheme';
import { PATH } from '@constants/paths';
import { NotificationType } from '@constants/text';

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
      type: NotificationType.error,
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
      <Route path={PATH.home} element={<Content theme={this.state.theme} />}>
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
          path={PATH.createTodo}
          element={<CreateTodo theme={this.state.theme} />}
        />
        <Route
          path={PATH.todo}
          element={
            <TodoPage todos={this.state.todos} theme={this.state.theme} />
          }
        />
      </Route>
    );
    const unProtectedRoutes = (
      <>
        <Route
          path={PATH.auth}
          element={
            <Auth
              responseHandler={(response) => this.responseHandler(response)}
              theme={this.state.theme}
            />
          }
        />
        <Route
          path={PATH.signUp}
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
                <Navigate to={PATH.home} replace />
              ) : (
                <Navigate to={PATH.auth} replace />
              )
            }
          />
        </Routes>
      </Layout>
    );
  }
}
