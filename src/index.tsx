import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import { ThemeProvider } from './components/ThemeProvider';
import { IntlProvider } from './components/IntlProvider';
import { themeStorage } from './utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider themeStorage={themeStorage}>
        <IntlProvider>
          <App />
        </IntlProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
