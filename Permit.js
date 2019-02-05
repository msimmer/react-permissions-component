import React from 'react'

class Permit extends React.Component {
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

  content = ({ editable, viewable, executable }) => {
    return this.props.children
      ? this.children()
      : this.executable() && executable
      ? React.cloneElement(executable)
      : this.editable() && editable
      ? React.cloneElement(editable)
      : this.viewable() && viewable
      ? React.cloneElement(viewable)
      : null
  }

  render = () => <React.Fragment>{this.content(this.props)}</React.Fragment>
}

export default Permit
