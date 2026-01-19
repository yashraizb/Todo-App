import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TaskContainer from './components/TaskContainer'
import Sidebar from './components/Sidebar'


function App() {

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  }

  return (
    <>
      <Navbar toggle={toggle} />
      <div className="app-layout">
        <Sidebar collapsed={collapsed} />
        <main className="main-content">
          <TaskContainer />
        </main>
      </div>
    </>
  )
}

export default App
