import { useRef } from 'react';
import classes from './RequestContainer.module.css';

const RequestContainer = (props) => {
    const taskNumbersRef = useRef();

    const onGetTasksHandler = () => {
        if(!taskNumbersRef.current.value || taskNumbersRef.current.value < 1){
            alert("Enter a valid number between 1 and 500");
            return;
        }

        props.getTasks(taskNumbersRef.current.value);
    }

    return(
        <div className={classes.RequestContainer}>
            <input ref={taskNumbersRef} type="number" min="1" max="500" />
            <button onClick={onGetTasksHandler}>Get Tasks</button>
        </div>
    )
}

export default RequestContainer;