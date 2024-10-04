
// import './App.css';
// import Timer from './components/Timer';
// import { Routes, Route } from 'react-router-dom';
// import TimerControl from './components/TimerControl';

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path='/' element={<Timer />} />
//         <Route path='/button' element={<TimerControl />} />
//       </Routes>  
//     </>
//   );
// }

// export default App;


import './App.css';
import Timer from './components/Timer';
import TimerControl from './components/TimerControl';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Test() {
  return <h1>This is a Test Page</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/button" element={<TimerControl />} />
        <Route path="/test" element={<Test />} /> {/* New test route */}
      </Routes>
    </Router>
  );
}

 export default App;