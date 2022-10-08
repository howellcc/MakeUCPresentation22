# Setup a new application
``` 
mkdir foo && cd foo
npm init --yes foo 
```

Update the `package.json` file as required.

Add the `tsconfig.json` file.
```
{
    "compilerOptions": {
        "target": "es5",
        "sourceMap": true
    }
}
```

# Install dependencies
```
npm install --save typescript ts-node
npm install --save-dev @types/node
```
We'll need typescript and ts-node to run the app. We could install these globally as well, but I prefer to keep and use local dependencies.