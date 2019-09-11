import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
    state = {
        course: null,
    }

    // Call getCourses method to fetch a list of courses
    // when the component is mounted.
    componentDidMount() {
        this.getCourse();
    }

    // Fetch an array of course objects and
    // set it to the courses state.
    getCourse = () => {
        fetch('http://localhost:5000/api/courses/' + this.getId())
            .then(res => res.json())
            .then(course => this.setState({ course }));
    }

    getId = () => {
        return this.props.match.params.id;
    }

    render() {
        const { course } = this.state;
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link className="button" to={course ? `/courses/${course.id}/update/` : ''}>Update Course</Link>
                                {/* update delete button url */}
                                <Link className="button" to="/">Delete Course</Link>
                            </span>
                        <Link className="button button-secondary" to="/">Return to List</Link></div>
                    </div>
                </div>

                <div className="bounds course--detail">
                    <div className="grid-66">
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
