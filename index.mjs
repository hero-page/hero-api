import fetch from 'node-fetch';

class HeroAPI {
    constructor(api_token) {
        this.api_token = api_token;
    }
    async fetchJSON(url, method, body) {
        const headers = {
            'Authorization': `Bearer ${this.api_token}`,
            'Content-Type': 'application/json',
        };
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        // Get response text
        const text = await response.text();
        // Try to parse the text as JSON
        try {
            return JSON.parse(text);
        }
        catch {
            // If parsing fails, return the text as a message object
            return { message: text };
        }
    }
    createSpace(name, isPublic, img) {
        return this.fetchJSON('https://hero.page/api/v1/createSpace', 'POST', {
            name,
            isPublic,
            img,
        });
    }
    getSpace(spaceId) {
        return this.fetchJSON(`https://hero.page/api/v1/getSpace/${spaceId}`, 'GET');
    }
    updateSpace(spaceId, body) {
        return this.fetchJSON(`https://hero.page/api/v1/updateSpace/${spaceId}`, 'POST', body);
    }
    listSpaces() {
        return this.fetchJSON('https://hero.page/api/v1/listSpaces', 'GET');
    }
    deleteSpace(spaceId) {
        return this.fetchJSON(`https://hero.page/api/v1/deleteSpace/${spaceId}`, 'POST');
    }
    createList(spaceId, name, color) {
        return this.fetchJSON('https://hero.page/api/v1/createList', 'POST', {
            spaceId,
            name,
            color,
        });
    }
    getList(spaceId, listId) {
        return this.fetchJSON(`https://hero.page/api/v1/getList/${spaceId}/${listId}`, 'GET');
    }
    updateList(spaceId, listId, name, color) {
        return this.fetchJSON(`https://hero.page/api/v1/updateList/${spaceId}/${listId}`, 'POST', {
            name,
            color,
        });
    }
    deleteList(spaceId, listId) {
        return this.fetchJSON(`https://hero.page/api/v1/deleteList/${spaceId}/${listId}`, 'POST');
    }
    listLists(spaceId) {
        return this.fetchJSON(`https://hero.page/api/v1/listLists/${spaceId}`, 'GET');
    }
    createItem(spaceId, requestBody) {
        return this.fetchJSON(`https://hero.page/api/v1/createItem/${spaceId}`, 'POST', requestBody);
    }
    updateItem(spaceId, itemId, requestBody) {
        return this.fetchJSON(`https://hero.page/api/v1/updateItem/${spaceId}/${itemId}`, 'POST', requestBody);
    }
    getItem(spaceId, itemId) {
        return this.fetchJSON(`https://hero.page/api/v1/getItem/${spaceId}/${itemId}`, 'GET');
    }
    listItems(spaceId, listId) {
        return this.fetchJSON(`https://hero.page/api/v1/listItems/${spaceId}/${listId}`, 'GET');
    }
    deleteItem(spaceId, itemId) {
        return this.fetchJSON(`https://hero.page/api/v1/deleteItem/${spaceId}/${itemId}`, 'POST');
    }
    uploadImage(base64, name) {
        return this.fetchJSON('https://hero.page/api/v1/uploadImage', 'POST', {
            base64: base64,
            name: name,
        });
    }
}

export { HeroAPI };

