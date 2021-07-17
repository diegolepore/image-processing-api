# Image Processor API
The Image Processor API is a Node.js API that processes images via query string. It leverages the power of the [Sharp](https://github.com/lovell/sharp) Node.js module for procesing images.

# Technologies & packages
The main technologies & packages used are:
| Name | Link |
| ------ | ------ |
| Node | https://nodejs.org/ |
| Express | https://expressjs.com/ |
| sharp | https://github.com/lovell/sharp |
| TypeScript | https://www.typescriptlang.org/ |
| jasmine | https://jasmine.github.io/ |
| supertest | https://github.com/visionmedia/supertest#readme |
| ESLint | https://eslint.org/ |
| Husky | https://typicode.github.io/husky/#/ |
| nodemon | https://nodemon.io/ |


# Installation & running dev server
```sh
npm install
npm run dev
```
ℹ️ _After executing the above commands, the API will be available at port 3000_

# Basic usage
```
http://localhost:3000/api/images?filename=laptop&width=550&height=450
```
ℹ️ _Note: This is the base query string needed, if one of the above parameters is not passed or has any errors (like passing a non numeric value) i will throw an error._
ℹ️ _Note:  Also, make sure you have the files you want to process in the _**images/full/**_ directory before using the API_

By executing the above, it will:

1. Check if the **filename**, **width** and **height** properties exist in the _**images/full/**_ directory _(e.g: images/full/laptop.jpeg. By default it will look for a **filename** with .jpeg extension)_.
2. Then it will process that image, and will generate an image with the **width** and **height** passed in the query string. Also, the image will have the name passed in **filename**. By default the generated image will have the **.jpeg** extension.
3. Next, it will store the newly generated image inside the _**images/thumbs/**_ directory.
4. The name of the generated image will containe a combination of the arguments passed in the query string (e.g. _**laptop-w550-h450.jpeg**_).

ℹ️ _Note: If the thumb directory doesn't exist, the app will create one (this is handle in one of the functions in the middleware)_
ℹ️ _Note: If the thumb already exists, it won't generate a new one, instead it will only serve the existent image_

# Testing
```sh
npm run test
```
There's also a test script for development:

```sh
npm run test:watch
```

# Building for production & runnig the server

```sh
npm run build
node build
```
