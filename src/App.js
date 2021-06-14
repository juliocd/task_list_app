import { useEffect, useState } from 'react';
import CardsContainer from './components/CardsContainer';
import RequestContainer from './components/RequestContainer';
import classes from './App.module.css';
import Modal from './components/UI/Modal';

const intitTask = {
  name: "",
  title: "",
  id: null
}

function App() {
  const [taskList, setTaskList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(intitTask);
  const [isLoading, setIsLoading] = useState(false);
  const [totalTasks, setTotalTasks] = useState({
    tasksRequested: 0,
    totalTasks: 0
  });

  useEffect(() => {
    async function fetchData() {
      await getTasks();
    }
    fetchData();
  }, []);

  const getTasks = async (tasksNumber) => {
    setIsLoading(true);

    try{
      const response = await fetch(`${process.env.REACT_APP_TASK_LIST_API_HOST}/api/v1/tasks${tasksNumber ? `?tasks_number=${tasksNumber}` : ''}`);
      const jsonResult = await response.json();

      if(jsonResult.result === 'success'){
        setTaskList(jsonResult.data.tasks);
        setTotalTasks({
          tasksRequested: tasksNumber ? tasksNumber : 3,
          totalTasks: jsonResult.data.total
        });
      }else{
        alert('There was an error retrieving tasks. Please, try later')
      }
    }catch(e){
      console.error('There was an internal error', e);
      alert('There was an internal error. Please, try later.')
    }
    setIsLoading(false);
  }

  const compelteTaskHandler = (taskId) => {
    setShowModal(true);
    const task = taskList.find(item => item.id === taskId);
    setTaskToComplete(task);
  }

  const onCloseModalHandler = () => {
    setShowModal(false);
    setTaskToComplete(intitTask);
  }

  const onCompleteModalHandler = async (taskId) => {
    setShowModal(false);
    setIsLoading(true);

    try{
      const response = await fetch(`${process.env.REACT_APP_TASK_LIST_API_HOST}/api/v1/task`,{
        method: 'PUT',
        body: JSON.stringify({
          task_id: taskId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const jsonResult = await response.json();

      if(jsonResult.result === 'success'){
        getTasks(totalTasks.tasksRequested);
      }else{
        alert('There was an error retrieving tasks. Please, try later')
      }
    }catch(e){
      console.error('There was an internal error', e);
      alert('There was an internal error. Please, try later.')
    }
  }

  const modalContent = (
    <Modal onClose={onCloseModalHandler}>
      <label>{`${taskToComplete.name} - ${taskToComplete.title}`}</label>
      <div className={classes["modal-button-container"]}>
        <button className={classes["modal-button"]} onClick={onCompleteModalHandler.bind(null, taskToComplete.id)}>Complete</button>
        <button className={classes["modal-button"]} onClick={onCloseModalHandler}>Close</button>
      </div>
    </Modal>);

  const loadingContent = (
    <div className={classes["loading-container"]}>
      <p>Loading, please wait...</p>
    </div>
  )

  return (
    <div className={classes.App}>
      <h2>Task List {totalTasks.tasksRequested > 0 && `${totalTasks.tasksRequested}/${totalTasks.totalTasks}`}</h2>
      <RequestContainer getTasks={getTasks} />
      {!isLoading && <CardsContainer 
        taskList={taskList}
        compelteTaskHandler={compelteTaskHandler} />}
      {isLoading && loadingContent}
      {showModal && taskToComplete && modalContent}
    </div>
  );
}

export default App;
