import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound/NotFound';

import { Auth } from './containers/Auth/Auth';
import { SignUp } from './containers/SignUp/SignUp';
import { Content } from './containers/Content/Content';
import { Layout } from './HOC/Layout/Layout';
import { CreateTodo } from './containers/CreateTodo/CreateTodo';
import { MainPage } from './containers/MainPage/MainPage';
import { TodoPage } from './containers/TodoPage/TodoPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Content />}>
          <Route index element={<MainPage />} />
          <Route path="to-do-create/:date" element={<CreateTodo />} />
          <Route path=":id" element={<TodoPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
