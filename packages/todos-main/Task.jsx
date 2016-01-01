// Task component - represents a single todo item
Task = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        task: React.PropTypes.object.isRequired,
        showPrivateButton: React.PropTypes.bool.isRequired
    },

    toggleChecked(){
        Tasks.methods.setChecked.call({
            taskId: this.props.task._id,
            setChecked: ! this.props.task.checked
        },(err) => {
            err && alert(err.error);
        });
    },

    deleteThisTask(){
        Tasks.methods.remove.call({
           taskId: this.props.task._id
        },(err) => {
            err && alert(err.error);
        });
    },

    togglePrivate(){
      Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
    },

    render() {
        const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
            (this.props.task.private ? "private" : "");


        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                    &times;
                </button>
                <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked} />

                { this.props.showPrivateButton ? (
                   <button className="toggle-private" onClick={this.togglePrivate}>
                       {this.props.task.private ? "Private" : "Public"}
                   </button>
                ):''}
                <span className="text"><strong>{this.props.task.username}</strong>:{this.props.task.text}</span>
            </li>
        );
    }
});