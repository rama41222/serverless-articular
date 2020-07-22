Article Manager API

## Live API [@AWS-Lambda](https://lu7tk88ba2.execute-api.ap-south-1.amazonaws.com/production/v1)
## Prerequisites 
1. Docker up and running
2. Node and npm installed
3. aws-cli
4. [Postman Collection](https://documenter.getpostman.com/view/2822837/T1DnixyL) or [goto](./_/)  for postman
 collection and the environment

## Setup
Skip if you have already setup the following.
1. On AWS console, create a aws user for serverless framework (lambda, ynamo db, cloud formation, IAM, AWS API gateway)
    ````shell script
    $ pip3 install awscli
    $ aws --version
    # configure aws-cli by setting the aws credentials 
    $ aws login 
    ````
2. install serverless framework
    ```shell script
    $ npm install -g serverless
    $ sls login
    # create a serverless app on dashboard   
    $ serverless --org {organization name} --app serverless-articular
    ```
3. Run the Mongodb locally
    ```shell script
    docker run -p 27017:27017 {Docker Container name}
    ```
4. Create a Serverless framework account for local deployment automation 
5. install npm packages inside the project
    ```shell script
    npm i
    ```
6. Set the .env configuration according to the environment
- Example .env names:
    1. .env.development
    2. .env.testing
    3. .env.production
    4. .env.${name_of_the_env}

    ```dotenv
    L_AWS_ACCESS_KEY=
    L_AWS_SECRET=
    L_AWS_REGION=
    APP_NAME=
    NODE_ENV=
    JWT_SECRET=
    JWT_ALGORITHM=
    JWT_EXP=5m
    DB_NAME=
    DB_HOST=
    DB_PORT=
    DB_PASSWORD=
    DB_USER=
    ADMIN_SEED={ "role": "", "name": "", "email": "", "password": ""}
    ```
    
7. Add the offline plugin to serverless framework 
    ```yaml
    plugins:
      - serverless-dotenv-plugin
      - serverless-offline
    ```
8. Run the project
```shell script
sls offline start --migrate --stage development 
```  
## Unit tests
- N/A 
```shell script
npm run test
```
## Important commands
   
##### Invoke functions individually  
```shell script
sls invoke local -f {function name} --stage {environment} 
```
##### Deploy to AWS
```shell script
sls deploy --stage production
```

#### Remove from production
```shell script
sls remove --stage production
```

## Discussion

 The application is naturally scalable since lambda can be scaled function wise. Breaking a tightly coupled API logic
  into small functions gives room for extending, scaling and improves testability.
  
### Advantages

* Lambda scales well
* Api can be tested and integrated well.
* Favours decoupling and SOLID principles

### Architecture

Please refer the following diagrams taken from AWS directly. 

<img src="_/serverless%20diagram.jpg"/>

### Q&A

1. Overview + Why I selected this tech stack ? 

     * App is based around AWS Lambda
     * The app is exposed to the web through an AWS API gateway connected to the lambda function, which has the service
      endpoints.
     * Lambda Function is also connected to a Cloud Atlas Mongodb. 
     * The Serverless api consist of User, Article and Topics Modules.
     * The endpoints are exposed through AWS lambda proxy where the API gateway will route the requests based on the uri
      to the particular function.
  
2. Weaknesses
   
     * Currently depends on Serverless framework and AWS. Writing a deployment using Terraform would make this cloud
      agnostic since almost all cloud providers support FaaS.
     * The code is mostly production ready
     * Maintaining the connection state inside lambda is a problem (Cold starts)
     * Some cross module dependencies which can be avoided by further decoupling the API.
     
3. *This Repo doesn't include the following*

    * Implement a refresh token mechanism (introspection endpoints, Token state manager) after JWT is expired (5mins)
    * Implementing a caching mechanism for the Binary Search Tree. Probably a redis cache
    * Test cases and increase test coverage
    * Write some Serverless integration tests
    * Add Joi validation library for further validation
    * Global Error handling module
