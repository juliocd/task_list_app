import Card from './Card';

import classes from './CardsContainer.module.css';

const CardsContainer = (props) => {
    return(
        <div className={classes.CardsContainer}>
            <div className={classes["cards-grid"]}>
                {props.taskList.map(task => {
                    return <Card 
                        taskName={task.name} 
                        taskTitle={task.title} 
                        isCompleted={task.is_completed}
                        completeTask={props.compelteTaskHandler.bind(null, task.id)}
                        key={task.id} />
                })}
            </div>
        </div>
    );
}

export default CardsContainer;