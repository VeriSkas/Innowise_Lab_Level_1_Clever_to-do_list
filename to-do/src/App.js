import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound/NotFound';

import { Auth } from './containers/Auth/Auth';
import { SignUp } from './containers/SignUp/SignUp';
import { Todos } from './containers/Todo/Todos';
import { Layout } from './HOC/Layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/to-do-create" element={<Todos />} />
        <Route path="/to-do/:id" element={<Todos />} />
        <Route path="/" element={<Todos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
