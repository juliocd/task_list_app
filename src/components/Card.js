import classes from './Card.module.css';

const Card = (props) => {
    
    const completeBtnHandler = e => {
        props.completeTask(props.id);
    }

    return(
        <div className={classes.Card}>
            <div className={classes["h-20"]}>
                <label>{props.taskName}</label>
            </div>
            <div className={classes["h-50"]}>
                <p>{props.taskTitle}</p>
            </div>
            {!props.isCompleted && <div className={classes["h-20"]}>
                <button onClick={completeBtnHandler}>Complete</button>
            </div>}
        </div>
    )
}

export default Card;