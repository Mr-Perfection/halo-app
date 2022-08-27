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

## Deploy S3
I followed this tutorial with some modifications
https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/deploy-a-react-based-single-page-application-to-amazon-s3-and-cloudfront.html

To successfully run build script, you have to add `DISABLE_ESLINT_PLUGIN=true` for now in .env.production to suppress. Need to clean up the errors in the future.

## Invalidate Cache (after S3 is updated)
aws cloudfront create-invalidation --distribution-id E1ENF29FUWH1YB --paths "/*"


