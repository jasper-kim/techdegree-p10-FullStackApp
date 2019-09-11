import React, { Component } from 'react';

export default class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        User: {},
        errors: [],
    }

    cancel = (event) => {
        event.preventDefault(); 
        this.props.history.push(`/courses/${this.state.id}`);
    }

    submit = () => {
        //call Data updateCourse method with course info object
        //if not success, set errors state and display
        //if success, redirect to detail page
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

    componentDidMount() {
        this.getCourse();
    }

    // Fetch an array of course objects and
    // set it to the courses state.
    getCourse = () => {
        fetch('http://localhost:5000/api/courses/' + this.getId())
            .then(res => res.json())
            .then(course => this.setState({ ...course }));
    }


    getId = () => {
        return this.props.match.params.id;
    }

    render () {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            User,
            errors
        } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
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
                            <p>By {User ? (`${User.firstName} ${User.lastName}`) : ''}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={this.change}>High-end furniture projects are great to dream about. But unless you have a well-equipped shop and some serious woodworking experience to draw on, it can be difficult to turn the dream into a reality.</textarea>
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
                                            value={estimatedTime ? estimatedTime : ''}
                                            onChange={this.change} />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded ? materialsNeeded : ''} onChange={this.change}></textarea>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                    </div>
                </form>
                </div>
            </div>
        );
    }
}