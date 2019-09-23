export default class Data {
    api = (url, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Expose-Headers': 'Location',
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {    
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    async getUser(emailAddress, password) {
        const url = 'http://localhost:5000/api/users';
        const response = await this.api(url, 'GET', null, true, { emailAddress, password });

        if(response.status === 200) {
            return response.json().then(data => data);
        } else if(response.status === 401) {
            return null;
        } else if (response.status === 500) {
            this.props.history.push(`/error`);
        } else {
            throw new Error();
        }
    }

    async createUser(user) {
        const url = 'http://localhost:5000/api/users';
        const response = await this.api(url, 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status ===400) {
            return response.json().then(data => data.errors);
        } else if (response.status === 500) {
            this.props.history.push(`/error`);
        } else {
            throw new Error();
        }
    }
}