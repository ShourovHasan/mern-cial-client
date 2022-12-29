import './App.css';
import { router } from './Routes/Routes/Router';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <div className='max-w-[1380px] mx-auto px-5'>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
