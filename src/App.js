// App.js

import './App.css';
import Homepage from './component/Homepage'; // Correcting the path to Homepage.js

function App() {
  return (
    <div>
      <header>
        <Homepage /> {/* Render the Homepage component */}
      </header>
    </div>
  );
}

export default App;
