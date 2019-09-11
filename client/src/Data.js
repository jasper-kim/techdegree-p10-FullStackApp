export default class Data {
    api = (url, method, body = null) => {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        return fetch(url, options);
    }

    async getUser() {

    }

    async createUser() {

    }

    async getCourses() {

    }
    
    async getCourse() {

    }
    
    async createCourse() {

    }
    
    async updateCourse() {

    }

    async deleteCourse() {

    }
}