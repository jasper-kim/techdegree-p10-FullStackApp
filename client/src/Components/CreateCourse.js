import React, {Component} from 'react';
import ErrorDisplay from './ErrorDisplay';

export default class CreateCourse extends Component {

    //Get user info with props from authenticatedUser

    state = {
        title: '',
        description: '',
        errors: [], // if errors come from server, it will set to this state
    }

    cancel = (event) => {
        event.preventDefault(); 
        this.props.history.push('/');
    }

    submit = (event) => {
        event.preventDefault();
        
        const { context } = this.props;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;

        const userId = context.authenticatedUser.id;
        
        const body = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId,
        }
        
        context.actions.createCourse(body)
            .then(data => {
                if(data.errors) {
                    this.setState({
                        errors: data.errors,
                    });
                } else {
                    //if creating a course is successfull, data returns the id of the new course
                    this.props.history.push(`/courses/${data}`);
                }
            })

    }

    change = (event) => {
        console.log(event);
        const {target: { name, value }} = event;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }

    render () {
        const {
            title,
            estimatedTime,
            errors,
        } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <ErrorDisplay errors={errors}/>
                    <form onSubmit={this.submit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        placeholder="Course title..." 
                                        value={title}
                                        onChange={this.change} />
                                </div>
                                {/* Update with authenticatedUser */}
                                <p>By Joe Smith</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        className="" 
                                        placeholder="Course description..." 
                                        onChange={this.change}/>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text" 
                                                className="course--time--input"
                                                placeholder="Hours" 
                                                value={estimatedTime} 
                                                onChange={this.change}
                                                />
                                        </div> 
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                className="" 
                                                placeholder="List materials..."
                                                onChange={this.change} />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}