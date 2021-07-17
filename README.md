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

![gif: Lets do this!](https://media.giphy.com/media/BpGWitbFZflfSUYuZ9/giphy.gif)

# Basic usage
```
http://localhost:3000/api/images?filename=laptop&width=550&height=450
```
ℹ️ _Note: This is the base query string needed, if one of the above parameters is not passed or has any errors (like passing a non numeric value) i will throw an error._
ℹ️ _Note:  Also, make sure you have the files you want to process in the **images/full/** directory before using the API_

By executing the above, it will:

1. Check if the **filename**, **width** and **height** properties exist in the _**images/full/**_ directory _(e.g: images/full/laptop.jpeg. By default it will look for a **filename** with .jpeg extension)_.
2. Then it will process that image, and will generate an image with the **width** and **height** passed in the query string. Also, the image will have the name passed in **filename**. By default the generated image will have the **.jpeg** extension.
3. Next, it will store the newly generated image inside the _**images/thumbs/**_ directory.
4. The name of the generated image will containe a combination of the arguments passed in the query string (e.g. _**laptop-w550-h450.jpeg**_).

ℹ️ _Note: If the thumb directory doesn't exist, the app will create one (this is handle in one of the functions in the middleware)_
ℹ️ _Note: If the thumb already exists, it won't generate a new one, instead it will only serve the existent image_

# 👍 Other use cases usages

ℹ️ _Examples of cases that will work with the current images in the _**images/full/**_ folder :_

```
http://localhost:3000/api/images?filename=laptop&width=200&height=200
```
```
http://localhost:3000/api/images?filename=programming&width=550&height=450
```
```
http://localhost:3000/api/images?filename=laptop&width=550&height=450&outputformat=png
```
```
http://localhost:3000/api/images?filename=programming&width=2550&height=1450&sourceformat=jpeg
```
```
http://localhost:3000/api/images?filename=programming&width=550&height=450&outputformat=png&sourceformat=jpeg
```
```
http://localhost:3000/api/images?filename=lavender&width=1200&height=1200&sourceformat=png&outputformat=jpg
```
ℹ️ _If you execute one of the above endpoints for second time, it wont generate the image again. It will return the image in memory instead_


# 👎 Other use cases usages that won't work

```
http://localhost:3000/api/images
```
```
http://localhost:3000/api/images?filename=supdude&width=200&height=200
```
```
http://localhost:3000/api/images?filename=programming&width=foo&height=450
```
```
http://localhost:3000/api/images?filename=programming&width=200&height=bar
```
```
http://localhost:3000/api/images?filename=programming&width=foo&height=bar
```
```
http://localhost:3000/api/images?filename=programming&width=2550&height=1450&sourceformat=png
```
```
http://localhost:3000/api/images?filename=programming&width=550&height=450&outputformat=svg&sourceformat=jpeg
```
# Building for production & runnig the server

```sh
npm run build
node build
```

# Testing
```sh
npm run test
```
There's also a test script for development:

```sh
npm run test:watch
```

# Linting
```sh
npm run lint
```
_Linting and fixing_
```sh
npm run lint-and-fix
```

# Other
In order to have automatically have Git hooks enabled after install, run the following commnad. You can read more about it in the [Husky documentation](https://typicode.github.io/husky/#/?id=install).
```sh
npm run prepare
```
