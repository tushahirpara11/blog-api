# blog-api

# Pre-requirements
Below two thing must be installed in your system.
1)Node Version: v12.14.0  
2)MongoDB shell version: v4.2.2  


## Fire Following Commands to run project.

```git
git clone https://github.com/tushahirpara11/blog-api.git  
```
## To move in project directory.

```bash
cd blog-api
```

## To install project dependencies.

```node
npm i
```

## Create .env file to configure project and create following enviroment variables.  

```node
 SECRET_KEY = 'your secret key'
 MONGODB = 'mongodb://127.0.0.1/Your Database Name'  
 HOSTNAME = 'Your Host Name'  
 PORT = add Port number  
```

## To start mongodb server using

```node
  sudo service mongod start 
```

## Finally, start project using  

```node 
 node app.js
```

