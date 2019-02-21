// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { permissionsPropType } from './prop-types'
import type { Permissions, Role, Roles, Element, Props } from './types'

class Permit extends React.Component<Props> {
  static defaultProps: {
    permissions: Permissions,
    roles: Roles,
    role: Role,
  } = {
    permissions: 644,
    roles: { admin: 0, editor: 1, guest: 2 },
    role: 'editor',
  }

  getPermissions = (): Array<string> => {
    const { permissions } = this.props
    const [u, g, o] = String(permissions)
      .split('')
      .map(a =>
        Number(a)
          .toString(2)
          .padStart(3, '0'),
      )
    return [u, g, o]
  }

  getRole = (): number => {
    const { role } = this.props
    return this.props.roles[role]
  }

  getAccess = (): { r: number, w: number, x: number } => {
    const permissions = this.getPermissions()
    const role = this.getRole()
    const [r, w, x] = permissions[role].split('').map(a => Number(a))
    return { r, w, x }
  }

  viewable = (): number => this.getAccess().r

  editable = (): number => this.getAccess().w

  executable = (): number => this.getAccess().x

  children = (): Element | null =>
    (this.editable() || this.viewable()) && this.props.children
      ? React.cloneElement(this.props.children)
      : null

  content = ({
    editable,
    viewable,
    executable,
  }: {
    editable?: Element,
    viewable?: Element,
    executable?: Element,
  }): Element | null =>
    this.props.children
      ? this.children()
      : this.executable() && executable
      ? React.cloneElement(executable)
      : this.editable() && editable
      ? React.cloneElement(editable)
      : this.viewable() && viewable
      ? React.cloneElement(viewable)
      : null

  render = (): Element => (
    <React.Fragment>{this.content(this.props)}</React.Fragment>
  )
}

Permit.propTypes = {
  // Validate at runtime since it's not possible with Flow's type system
  permissions: permissionsPropType.isRequired,
}

export default Permit
