class HttpManager {
    constructor() {
        this.defaultHeaders = [];
    }

    addDefaultHeader(header) {
        let found;

        this.defaultHeaders.forEach((eheader, index) => {
            if (eheader.key === header.key) {
                found = index;
            }
        });

        if (found) {
            this.defaultHeaders.splice(found, 1);
        }
        
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

    _createHeaders(incomingHeaders) {
        const headers = new Headers();
        this.defaultHeaders.forEach((header) => {
            headers.append(header.key, header.value);
        });

        if (incomingHeaders) {
            incomingHeaders.forEach(h => headers.append(h.key, h.value));
        }

        return headers;
    }

    get(uri) {
        const request = new Request(uri, {method: 'GET', headers: this._createHeaders()});
        return this._makeRequest(request);
    }

    put(uri, data, headers) {
        const request = new Request(uri, {method: 'PUT', body: data, headers: this._createHeaders(headers)});
        return this._makeRequest(request);
    }

    post(uri, data, headers) {
        const request = new Request(uri, {method: 'POST', body: data, headers: this._createHeaders(headers)});
        return this._makeRequest(request);
    }

    delete(uri) {
        const request = new Request(uri, {method: 'DELETE', headers: this._createHeaders()});
        return this._makeRequest(request);
    }
}

export default new HttpManager();