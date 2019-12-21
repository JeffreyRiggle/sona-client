class HttpManager {
    constructor() {
        this.defaultHeaders = [];
    }

    addDefaultHeader(header) {
        this.defaultHeaders.push(header);
    }

    _makeRequest(request) {
        return new Promise((resolve, reject) => {
            fetch(request).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.json());
                    return;
                }

                reject(response);
            });
        });
    }

    _createHeaders() {
        const headers = new Headers();
        this.defaultHeaders.forEach((header) => {
            headers.append(header.key, header.value);
        });
        return headers;
    }

    get(uri) {
        const request = new Request(uri, {method: 'GET', headers: this._createHeaders()});
        return this._makeRequest(request);
    }

    put(uri, data) {
        const request = new Request(uri, {method: 'PUT', body: data, headers: this._createHeaders()});
        return this._makeRequest(request);
    }

    post(uri, data) {
        const request = new Request(uri, {method: 'POST', body: data, headers: this._createHeaders()});
        return this._makeRequest(request);
    }

    delete(uri) {
        const request = new Request(uri, {method: 'DELETE', headers: this._createHeaders()});
        return this._makeRequest(request);
    }
}

export default new HttpManager();