# react-permissions-component

A proof of concept for using a *nix style permissions model in React Components

```js
import Permit from './Permit'

const MyComponent = props => (
  <Permit
    permissions={644}
    executable={<span>Hi Admin!</span>}
    editable={<span>Hi Editor!</span>}
    viewable={<span>Hi Guest!</span>}
    role={props.role} // 'admin', 'editor' or 'guest'
  />
)
```

Also available as a HOC

```js
import withPermissions from './withPermissions'

const config = { permissions: 600, role: 'admin' }
const MyComponent = () => <span>Hi Admin!</span>
const PermitComponent = withPermissions(config)(MyComponent)
```

## Install

```
$ git clone ...
```

## Test

```
$ npm test
```

See the [tests](https://github.com/msimmer/react-permissions-component/tree/master/__tests__) for details
