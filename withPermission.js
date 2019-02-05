import React from 'react'
import Permit from './Permit'

export default function withPermission(props) {
  const { permissions, role, roles } = props
  return function composedComponent(WrappedComponent) {
    return class extends React.Component {
      render = () => {
        return (
          <Permit permissions={permissions} role={role} roles={roles}>
            <WrappedComponent {...this.props} />
          </Permit>
        )
      }
    }
  }
}
