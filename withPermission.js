// @flow

import * as React from 'react'
import Permit from './Permit'
import type {
  Props,
  Element,
  WrappedComponent,
  ComposedComponent,
} from './types'

export default function withPermission(props: Props): ComposedComponent {
  const { permissions, role, roles } = props
  return function composedComponent(
    WrappedComponent: WrappedComponent,
  ): Element {
    return class extends React.Component<Props> {
      render = (): Element => {
        return (
          <Permit permissions={permissions} role={role} roles={roles}>
            <WrappedComponent {...this.props} />
          </Permit>
        )
      }
    }
  }
}
