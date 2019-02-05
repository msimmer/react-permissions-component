import React from 'react'
import PropTypes from 'prop-types'
import { permissionsPropType } from './prop-types'

class Permit extends React.Component {
  static defaultProps = {
    permissions: 644,
    roles: { admin: 0, editor: 1, guest: 2 },
    role: 'editor',
  }

  getPermissions = () => {
    const { permissions } = this.props
    const [u, g, o] = String(permissions)
      .split('')
      .map(a =>
        Number(a)
          .toString(2)
          .padStart('3', '0'),
      )
    return [u, g, o]
  }

  getRole = () => {
    const { role } = this.props
    return this.props.roles[role]
  }

  getAccess = () => {
    const permissions = this.getPermissions()
    const role = this.getRole()
    const [r, w, x] = permissions[role].split('').map(a => Number(a))
    return { r, w, x }
  }

  viewable = () => this.getAccess().r

  editable = () => this.getAccess().w

  executable = () => this.getAccess().x

  children = () =>
    this.editable() || this.viewable()
      ? React.cloneElement(this.props.children)
      : null

  content = ({ editable, viewable, executable }) =>
    this.props.children
      ? this.children()
      : this.executable() && executable
      ? React.cloneElement(executable)
      : this.editable() && editable
      ? React.cloneElement(editable)
      : this.viewable() && viewable
      ? React.cloneElement(viewable)
      : null

  render = () => <React.Fragment>{this.content(this.props)}</React.Fragment>
}

Permit.propTypes = {
  permissions: permissionsPropType.isRequired,
  roles: PropTypes.shape({
    admin: PropTypes.number.isRequired,
    editor: PropTypes.number.isRequired,
    guest: PropTypes.number.isRequired,
  }).isRequired,
  role: PropTypes.oneOf(['admin', 'editor', 'guest']).isRequired,
  executable: PropTypes.node,
  editable: PropTypes.node,
  viewable: PropTypes.node,
}

export default Permit
