import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ErrorDisplay from './ErrorDisplay';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
    state = {
        course: null,
        errors: [],
    }

    // Call getCourseDetail method to fetch detail of courses
    // when the component is mounted.
    componentDidMount() {
        this.getCourseDetail();
    }

    render() {
        const { course, errors } = this.state;
        const { authenticatedUser } = this.props.context;
        let authButton = '';

        // If fetching course detail and a user signed in
        if(course && authenticatedUser) {
            // and the owner of the course and signed user are matched
            if(course.User.id === authenticatedUser.id) {
                // show Update and Delete button
                authButton = <React.Fragment>
                                <Link className="button" to={course ? `/courses/${course.id}/update/` : ''}>Update Course</Link>
                                <button className="button" onClick={()=>{this.deleteCourse(course.id)}}>Delete Course</button>
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
                        {course ? '' : <h1>Loading.....</h1>}
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course ? course.title : ''}</h3>
                            <p>By {course ? (`${course.User.firstName} ${course.User.lastName}`) : ''}</p>
                        </div>
                        <div className="course--description">
                            {course ? <ReactMarkdown source={course.description} /> : ''}
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
                                    {course ? <ReactMarkdown source={course.materialsNeeded || "N/A"} /> : ''}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    
    /**
     * Fetch course detail
     * @param {string} id - URL parameter
     * @memberof CourseDetail
     */
    getCourseDetail = async (id = this.props.match.params.id) => {
        const url = 'http://localhost:5000/api/courses/';
        const response = await this.props.context.data.api(url + id);

        if(response.status === 200) {
            response.json().then(data => this.setState({course: data}));
        } else if (response.status === 400) {
            this.props.history.push(`/notfound`);
        } else if (response.status === 500) {
            this.props.history.push(`/error`);
        } else {
            throw new Error();
        }
    }

    /**
     * Delete course 
     * @param {string} id - URL parameter 
     * @memberof CourseDetail
     */
    deleteCourse = async (id = this.props.match.params.id) => {
        const url = `http://localhost:5000/api/courses/${id}`;

        const { context } = this.props;
        const { emailAddress } = context.authenticatedUser;
        const password = context.userPassword;
        const response = await context.data.api(url, 'DELETE', null, true, {emailAddress, password});

        if (response.status === 204) {
            this.props.history.push(`/`);
        } else if (response.status === 403) {
            this.props.history.push(`/forbidden`);
        } else if (response.status === 400) {
            response.json().then(data => {
                this.setState({
                    errors: data.errors,
                })
            });
        } else if (response.status === 500) {
            this.props.history.push(`/error`);
        } else {
            throw new Error();
        }
    }
}
