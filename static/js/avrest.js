
export function AVRest() { return {

    // All methods will attempt to convert response into a valid JSON object.
    // If response cannot be parsed as JSON the raw text will be given to callback instead.

    create(url, data, callback) { this.driver.create(this, url, data, callback); },
    read(url, callback) { this.driver.read(this, url, callback); },
    update(url, data, callback) { this.driver.update(this, url, data, callback); },
    delete(url, callback) { this.driver.delete(this, url, callback); },

    inject_headers: {},

    driver: {
        create(avrest, url, data, callback) {
            console.log('AVRest.create(' + url + ', ' + data + ')');
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) { // READY
                    let success = xmlHttp.status >= 200 && xmlHttp.status < 300;
                    let json = null;
                    try {
                        json = JSON.parse(xmlHttp.responseText);
                    }
                    catch (err){} // Deliberately empty
                    callback(success, json ?? xmlHttp.responseText);
                }
            }
            xmlHttp.open('POST', url, true); // true for asynchronous 
            xmlHttp.setRequestHeader('Content-Type', 'application/json');
            for (const [h, v] of Object.entries(avrest.inject_headers)) { 
                xmlHttp.setRequestHeader(h, v); 
            }
            xmlHttp.send(JSON.stringify(data));
        },
        read(avrest, url, callback) {
            console.log('AVRest.read(' + url + ')');
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4) { // READY
                    let success = xmlHttp.status >= 200 && xmlHttp.status < 300;
                    let json = null;
                    try {
                        json = JSON.parse(xmlHttp.responseText);
                    }
                    catch (err){} // Deliberately empty
                    callback(success, json ?? xmlHttp.responseText);
                }
            }
            xmlHttp.open('GET', url, true); // true for asynchronous 
            for (const [h, v] of Object.entries(avrest.inject_headers)) { 
                xmlHttp.setRequestHeader(h, v); 
            }
            xmlHttp.send(null);
        },
        update(avrest, url, data, callback) { 
            console.log('AVRest.update(' + url + ', ' + data + ')');
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) { // READY
                    let success = xmlHttp.status >= 200 && xmlHttp.status < 300;
                    let json = null;
                    try {
                        json = JSON.parse(xmlHttp.responseText);
                    }
                    catch (err){} // Deliberately empty
                    callback(success, json ?? xmlHttp.responseText);
                }
            }
            xmlHttp.open('PUT', url, true); // true for asynchronous 
            xmlHttp.setRequestHeader('Content-Type', 'application/json');
            for (const [h, v] of Object.entries(avrest.inject_headers)) { 
                xmlHttp.setRequestHeader(h, v); 
            }
            xmlHttp.send(JSON.stringify(data));
        },
        delete(avrest, url, callback) {
            console.log('AVRest.delete(' + url + ')');
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4) { // READY
                    let success = xmlHttp.status >= 200 && xmlHttp.status < 300;
                    let json = null;
                    try {
                        json = JSON.parse(xmlHttp.responseText);
                    }
                    catch (err){} // Deliberately empty
                    callback(success, json ?? xmlHttp.responseText);
                }
            }
            xmlHttp.open('DELETE', url, true); // true for asynchronous 
            xmlHttp.setRequestHeader('Content-Type', 'application/json');
            for (const [h, v] of Object.entries(avrest.inject_headers)) { 
                xmlHttp.setRequestHeader(h, v); 
            }
            xmlHttp.send(null);
        }
    }
}}