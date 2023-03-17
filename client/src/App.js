import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import store from './store';
import ProtectedRoute from './hoc/ProtectedRoute';
import Login from './pages/Login';
import AdminArticles from './pages/AdminArticles';
import Articles from './pages/Articles';
import NotFound from './pages/NotFound';
import EditArticle from './pages/EditArticle';
import Article from './pages/Article';

function App() {
  return (<StoreProvider store={store}>
      <Router>
        <Switch>
          <Route path={['/', '/articles']} exact component={Articles} />
          <Route path="/articles/:id" component={Article} />
          <Route path="/admin/login" component={Login} />
          <ProtectedRoute path="/admin/articles" exact component={AdminArticles} />
          <ProtectedRoute path="/admin/articles/create" component={EditArticle} />
          <ProtectedRoute path="/admin/articles/edit/:id" component={EditArticle} />
          <Route component={NotFound} />
        </Switch>
      </Router>
  </StoreProvider>);
}

export default App;
