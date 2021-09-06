import React, { useMemo } from 'react';
import './App.scss';
import { generatorDynamicRouter } from './router/route-tool';
import { useSelector } from 'react-redux';
import { FIntlProvider, FRouteView } from './component';
import history from './router/route-root';
import { Router } from 'react-router-dom';
import { RootState } from './store';

const App = () => {
  const { menus } = useSelector((state: RootState) => state.user);
  const routes = useMemo(() => {
    return <FRouteView>{generatorDynamicRouter(menus)}</FRouteView>;
  }, [menus]);

  return (
    <div className="App">
      <Router history={history}>
        <FIntlProvider>{routes}</FIntlProvider>
      </Router>
    </div>
  );
};

export default App;
