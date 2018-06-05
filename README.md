# rxjs-learn
Practicing RxJS

Repository for learning RxJS. Feel free to use its contents and generate pull requests. :)

### Development Environment:

Setup development environment by following steps from:
https://coursetro.com/posts/code/147/How-to-Install-RxJS---Setting-up-a-Development-Environment

### Troubleshooting:

##### Error:

```
ERROR in ./node_modules/rxjs/Observable.js
Module not found: Error: Can't resolve 'rxjs-compat/Observable' in '../rxjs-learn/node_modules/rxjs'
 @ ./node_modules/rxjs/Observable.js 6:9-42
 @ ./src/code.ts
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./src/code.ts
```

##### Fix: 

Install rxjs-compact using:
```
yarn add rxjs-compact
```
