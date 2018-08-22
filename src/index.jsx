/* eslint-disable import/no-extraneous-dependencies */
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from '../index';
import Example from './components/Example';

const root = document.getElementById('root');

const load = () => render((
  <Provider>
    <AppContainer>
      <Example />
    </AppContainer>
  </Provider>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/Example', load);
}

load();