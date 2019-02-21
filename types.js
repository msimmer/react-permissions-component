export type Permissions = number

export type Role = 'admin' | 'editor' | 'guest'

export type Roles = {
  admin: number,
  editor: number,
  guest: number,
}

export type Element = React.Element<*>

export type Props = {
  role: Role,
  roles: Roles,
  permissions: Permissions,
  executable?: Element,
  editable?: Element,
  viewable?: Element,
  children?: Element,
}

export type WrappedComponent = React.AbstractComponent<Props>

export type ComposedComponent = (WrappedComponent: WrappedComponent) => Element
