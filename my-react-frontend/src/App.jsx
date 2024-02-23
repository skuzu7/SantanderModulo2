import TaskList from './components/TaskList/TaskList';
import TaskModal from './components/TaskModal/TaskModal';
import './App.css';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>  
      <TaskList />
      <TaskModal />   
    </div>
  );
}

export default App;
