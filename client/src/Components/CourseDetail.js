import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ErrorDisplay from './ErrorDisplay';

export default class CourseDetail extends Component {
    state = {
        course: null,
        errors: [],
    }

    // Call getCourses method to fetch a list of courses
    // when the component is mounted.
    componentDidMount() {
        this.getCourseDetail();
    }

    // Fetch an array of course objects and
    // set it to the courses state.
    getCourseDetail = async () => {
        const course = await this.props.context.data.getCourseDetail(this.props.match.params.id);
        this.setState({course});
    }

    render() {
        const { course, errors } = this.state;
        const { authenticatedUser, actions } = this.props.context;
        let authButton = '';
        
        if(course && authenticatedUser) {
            if(course.User.id === authenticatedUser.id) {
                authButton = <React.Fragment>
                                <Link className="button" to={course ? `/courses/${course.id}/update/` : ''}>Update Course</Link>
                                <button className="button" onClick={()=>{
                                    actions.deleteCourse(course.id)
                                        .then(data => {
                                            if(data.errors) {
                                                this.setState({
                                                    errors: data.errors,
                                                });
                                            } else {
                                                //if Deleting a course is successfull, data returns '/'
                                                this.props.history.push(data);
                                            }
                                        });
                                }}>Delete Course</button>
                            </React.Fragment>
            }
        }

        return (
            <div>
                <div className="actions--bar">;
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                { authButton }
                            </span>
                        <Link className="button button-secondary" to="/">Return to List</Link></div>
                                
                    </div>
                </div>

                <div className="bounds course--detail">
                    <div className="grid-66">
                        <ErrorDisplay errors={errors}/>
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course ? course.title : ''}</h3>
                            <p>By {course ? (`${course.User.firstName} ${course.User.lastName}`) : ''}</p>
                        </div>
                        <div className="course--description">
                            <p>{course ? course.description : ''}</p>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course ? course.estimatedTime || 'N/A' : ''}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <p>{course ? course.materialsNeeded || 'N/A' : ''}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
