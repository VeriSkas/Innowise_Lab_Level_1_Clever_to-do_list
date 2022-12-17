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
import { auth } from './api/api-config';
import { localStorageHandler } from './shared/localStorage';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      notification: null,
      uid: null,
    };
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        localStorageHandler('setItem', 'uid', uid);
        this.setState(() => ({ isLoggedIn: true }));
      } else {
        localStorageHandler('removeItem', 'uid');
        this.setState(() => ({ isLoggedIn: false }));
      }
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

  render() {
    return (
      <Layout
        isLoggedIn={this.state.isLoggedIn}
        notification={this.state.notification}
      >
        <Routes>
          <Route
            path="/auth"
            element={
              this.state.isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Auth
                  responseHandler={(response) => this.responseHandler(response)}
                />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              this.state.isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <SignUp
                  responseHandler={(response) => this.responseHandler(response)}
                />
              )
            }
          />
          {this.state.isLoggedIn ? (
            <Route path="/" element={<Content />}>
              <Route index element={<MainPage />} />
              <Route path="to-do-create/:date" element={<CreateTodo />} />
              <Route path=":id" element={<TodoPage />} />
            </Route>
          ) : null}
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
