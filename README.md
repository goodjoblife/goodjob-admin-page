# GoodJobAdminPage

## Dev
```sh
REACT_APP_API_HOST=http://your.api.server.host yarn start
```

## Build
```sh
REACT_APP_API_HOST=http://your.api.server.host yarn build
```

## Developer Notes
* When you define the query script, please consider the `id` or `_id` in the entity if a real global-unique id. If not, please disable this entity cache funcionality in `graphqlClient.js - dataIdFromObject`
