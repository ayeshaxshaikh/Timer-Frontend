
// import './App.css';
// import Timer from './components/Timer';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import TimerControl from './components/TimerControl';

// function App() {
//   const uniqueId = localStorage.getItem('uniqueTimerId');
  
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Navigate to={`/${uniqueId}`} replace />} />
//         <Route path='/:uniqueId' element={<Timer />} />
//         <Route path='/:uniqueId/button' element={<TimerControl/>}  />
//       </Routes>  
//     </>
//   );
// }

// export default App;






import './App.css';
import Timer from './components/Timer';
import TimerControl from './components/TimerControl';
import TimerCreation from './components/TimerCreation';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TimerCreation />} />
      <Route path="/:uniqueId" element={<Timer />} />
      <Route path="/:uniqueId/button" element={<TimerControl />} />
    </Routes>
  );
}

export default App;
