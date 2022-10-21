# MakeUC Presentation '22
This is where I will I will keep any resources around my MakeUC presentation. 

## Prerequisites
Obtain a free [Opensky Network](https://opensky-network.org/) login and add those credentials to the opensky-config.json for local use. You can use their api without a login, but with some added restrictions.

## Development Environment Setup
I did all this work using [Visual Studio Code](https://code.visualstudio.com/Download) and NodeJs 16.14.2LTS. (Though earlier versions should work) NodeJs can be installed from their [website](https://nodejs.org/en/blog/release/v16.14.2/) or by using a [Node Version Manager](https://github.com/coreybutler/nvm-windows). 

Each "step" is meant to be opened as its own workspace in VSCode. You can use the included *.code-workspace files. 

### Dependencies
On Windows (within VSCode)
```
task install-npm-packages
```

On Linux/Mac
```
npm install --save typescript ts-node opensky-api treeify aviation-math
npm install --save-dev @types/node
```

## Running Each Step
Once in the respective workspace type the following into the terminal.
``` 
npm run makeuc
```

## Special Thanks To
- The OpenSky Network, https://opensky-network.org for their excellent and free api. 
- [Raed](https://github.com/raed667) for his [OpenSky-API](https://www.npmjs.com/package/opensky-api) NPM package. It saved me a tremendous amount of time while putting together these resources. 

