# Hero API

Welcome to the Hero API npm package! This library provides a simple and efficient way to interact with the [Hero Platform](https://hero.page), a free online platform for creating and sharing content including blogs, photos, files, and more.

To try this API online, go to the [Hero API Playground](https://docs.hero.page/space/create-a-new-space)

## API Key
To find your API Key: 
1. Go to https://hero.page and sign in
2. Click your profile picture on the top right of the page to open a drop down menu
3. Click on "Account Settings"
4. When the settings modal opens, click "Get API Key"
5. After a few seconds, your API Key will appear.

## Features

- **Space Management**: Create, update, retrieve, list, and delete Spaces within your Hero Page.
- **List Management**: Organize content within Spaces by creating and managing Lists.
- **Item Management**: Easily handle items in your Lists with functionalities to add, update, retrieve, list, and delete.
- **Markdown Support**: Utilize Markdown for text formatting in your Notes.

## Why Use Hero API?

Whether you're building a personal project, promoting a business, organizing an event, or fostering a community, the Hero API lets you take control of your content in a programmable way. Enhance your project with the rich features that Hero Platform offers!

## Important Usage Note

When using `hero-api`, please ensure that your project is configured to use ES modules. This can be done in one of two ways:

1. **Using `.mjs` Extension**: Name your files with the `.mjs` extension to explicitly mark them as ES modules.

2. **Setting `"type": "module"` in `package.json`**: Include the `"type": "module"` key-value pair in your project's `package.json` file. This will treat all `.js` files in your project as ES modules.

### Example of Importing `hero-api`

Once you've configured your project to use ES modules, you can import `hero-api` using the following syntax:

```javascript
import { HeroAPI } from 'hero-api';
```

## Example Usage

```javascript
import { HeroAPI } from "hero-api";

const hero = new HeroAPI('YOUR_API_TOKEN');

const DEFAULT_SPACE_IMG = "https://picsum.photos/600/500";

async function createContent() {
    let testsPassed = 0;
    let failedTests = [];
  
    try {
      // Creating Space
      const spaceResponse = await hero.createSpace('Amazing Space', true, DEFAULT_SPACE_IMG);
      console.log('Space created:', spaceResponse);
      testsPassed++;
      const spaceId = spaceResponse.id;
  
      // Getting Space
      const getSpaceResponse = await hero.getSpace(spaceId);
      console.log('Space fetched:', getSpaceResponse);
      testsPassed++;
  
      // Updating Space
      const updateSpaceResponse = await hero.updateSpace(spaceId, { name: 'Updated Space', isPublic: true, img: "https://picsum.photos/600/400" });
      console.log('Space updated:', updateSpaceResponse);
      testsPassed++;
  
      // Creating List
      const listResponse = await hero.createList(spaceId, 'My List', '#FF5733');
      console.log('List created:', listResponse);
      testsPassed++;
      const listId = listResponse.id;
  
      // Getting List
      const getListResponse = await hero.getList(spaceId, listId);
      console.log('List fetched:', getListResponse);
      testsPassed++;
  
      // Updating List
      const updateListResponse = await hero.updateList(spaceId, listId, 'Updated List', '#00FF00');
      console.log('List updated:', updateListResponse);
      testsPassed++;
  
      // Listing Lists
      const listListsResponse = await hero.listLists(spaceId);
      console.log('Lists fetched:', listListsResponse);
      testsPassed++;
  
      // Creating Item
      const itemRequestBody = {
        listId: listId,
        title: 'My first Item',
        // other attributes as needed
      };
      const itemResponse = await hero.createItem(spaceId, itemRequestBody);
      console.log('Item created:', itemResponse);
      testsPassed++;
  
      // Getting Item
      const itemId = itemResponse.id; // Assuming itemResponse contains the item ID
      const getItemResponse = await hero.getItem(spaceId, itemId);
      console.log('Item fetched:', getItemResponse);
      testsPassed++;
  
      // Updating Item
      const updateItemRequestBody = {
        title: 'Updated Item titleee'
        // other attributes as needed
      };
      await hero.updateItem(spaceId, itemId, updateItemRequestBody);
      console.log('Item updated');
      testsPassed++;
  
      // Deleting Item
      await hero.deleteItem(spaceId, itemId);
      console.log('Item deleted');
      testsPassed++;
  
      // Deleting List
      await hero.deleteList(spaceId, listId);
      console.log('List deleted');
      testsPassed++;
  
      // Deleting Space
      await hero.deleteSpace(spaceId);
      console.log('Space deleted');
      testsPassed++;
  
      console.log('Tests passed:', testsPassed);
    } catch (error) {
      console.error('An error occurred:', error);
      failedTests.push(error.message);
      console.log('Failed tests:', failedTests);
    }
  }

createContent();
```

## Multiple Lists & Items Example

```javascript
async function createRandomContent() {
    try {
      // Creating Space
      const spaceResponse = await hero.createSpace('Amazing Random Space', true);
      console.log('Space created:', spaceResponse);
      const spaceId = spaceResponse.id;
  
      // Generate random colors
      function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
      }
  
      // Creating 4 Lists
      for (let i = 1; i <= 4; i++) {
        const listName = 'Random List ' + i;
        const listColor = getRandomColor();
        const listResponse = await hero.createList(spaceId, listName, listColor);
        console.log('List created:', listResponse);
        const listId = listResponse.id;
  
        // Creating 5 Items for each List
        for (let j = 1; j <= 5; j++) {
          const itemTitle = 'Random Item ' + j;
          const itemRequestBody = {
            listId: listId,
            title: itemTitle,
          };
          const itemResponse = await hero.createItem(spaceId, itemRequestBody);
          console.log('Item created:', itemResponse);
        }
      }
  
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  createRandomContent();
  ```

  ## Uploading and hosting images on Hero
  ```javascript

async function uploadImageAndLogURL() {
    const base64Image = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFM..."; // Not a real base64 string, can find one with a quick google search!
    
    const response = await hero.uploadImage(base64Image, "ExampleImage");
  
    if (response.url) {
      console.log('Image uploaded successfully:', response.url);
    } else {
      console.log('Error uploading image:', response);
    }
  }
  
  uploadImageAndLogURL();
  ```