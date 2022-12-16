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

  render() {
    return (
      <Layout isLoggedIn={this.state.isLoggedIn}>
        <Routes>
          <Route
            path="/auth"
            element={
              this.state.isLoggedIn ? <Navigate to="/" replace /> : <Auth />
            }
          />
          <Route
            path="/sign-up"
            element={
              this.state.isLoggedIn ? <Navigate to="/" replace /> : <SignUp />
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
