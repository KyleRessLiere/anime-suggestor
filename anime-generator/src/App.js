
import './shared/styles.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import SiteNavbar from './components/SiteNavbar';
import AnimeForm from './components/AnimeForm';


function App() {
  return (
    <div className="App">
    <SiteNavbar />
    <AnimeForm />
    </div>
  );
}

export default App;
