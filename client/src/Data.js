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

    async createUser(user) {
        const url = 'http://localhost:5000/api/users';
        const response = await this.api(url, 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status ===400) {
            return response.json().then(data => data.errors);
        } else {
            throw new Error();
        }
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