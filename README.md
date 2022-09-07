# HaloApp (random name for now)
content moderation

# MaterialUI
We use UI components from MaterialUI.
https://mui.com


# Atomic Design
We follow atomic design principles. 
https://blog.bitsrc.io/atomic-design-and-ui-components-theory-to-practice-f200db337c24


# Prerequisites
**Mandatory**
```
node 18.7.0
npm 8.15.1
```

# TODO (migrate this to Asana or Jira)

* Dynamically render components based on json data.
https://www.pluralsight.com/guides/how-to-render-a-component-dynamically-based-on-a-json-config


# Start server locally
```sh
yarn run start
```

# GraphQL Codegen
https://github.com/dotansimha/graphql-code-generator


# Deployment

## Steps
### Deploy S3
I followed this tutorial with some modifications
https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/deploy-a-react-based-single-page-application-to-amazon-s3-and-cloudfront.html

To successfully run build script, you have to add `DISABLE_ESLINT_PLUGIN=true` for now in .env.production to suppress. Need to clean up the errors in the future.

```
aws s3 sync build s3://www-frontend
```
### Invalidate Cache (after S3 is updated)
```
aws cloudfront create-invalidation --distribution-id E1ENF29FUWH1YB --paths "/*"
```


## Route 53 with custom domain name
Video entails how to set it up.
https://www.youtube.com/watch?v=kvlSep7m7Uk

# Feature Requests

## Implement Danger js in the pipeline for code quality and regression prevention
https://danger.systems/js/


# Environments
probably better to build react app in docker and inject envs via pipeline but not high priority right now.

## .env.development
```
REACT_APP_APOLLO_CLIENT_URL=http://localhost:4000/graphql
ESLINT_NO_DEV_ERRORS=true
```

## .env.production
```sh
REACT_APP_APOLLO_CLIENT_URL=https://graphql.beta.app.getsocialkarma.com/graphql
DISABLE_ESLINT_PLUGIN=true
```