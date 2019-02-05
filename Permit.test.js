import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
// import { expect } from 'chai'
import Permit from './Permit'

configure({ adapter: new Adapter() })

const Viewable = () => (
  <form>
    <input type="text" readOnly={true} />
  </form>
)
const Editable = () => (
  <form>
    <input type="text" />
    <button value="save" />
  </form>
)
const Executable = () => (
  <form>
    <input type="text" />
    <button value="save" />
    <button value="delete" />
  </form>
)

test('Parses the props', () => {
  const component = mount(
    <Permit
      permissions={640}
      editable={<Editable />}
      viewable={<Viewable />}
      executable={<Executable />}
      role="admin"
      roles={{
        admin: 0,
        editor: 1,
        guest: 2,
      }}
    />,
  )

  expect(component.instance().getPermissions()).toEqual([
    (6).toString(2).padStart('3', '0'),
    (4).toString(2).padStart('3', '0'),
    (0).toString(2).padStart('3', '0'),
  ])
  expect(component.instance().getRole()).toEqual(0)
  expect(component.instance().getAccess()).toEqual({ r: 1, w: 1, x: 0 })

  component.setProps({ role: 'editor' })
  component.setProps({ permissions: 740 })

  expect(component.instance().getPermissions()).toEqual([
    (7).toString(2).padStart('3', '0'),
    (4).toString(2).padStart('3', '0'),
    (0).toString(2).padStart('3', '0'),
  ])
  expect(component.instance().getRole()).toEqual(1)
  expect(component.instance().getAccess()).toEqual({ r: 1, w: 0, x: 0 })
})

test('Renders the components passed in props', () => {
  const component = mount(
    <Permit
      permissions={744}
      editable={<Editable />}
      viewable={<Viewable />}
      executable={<Executable />}
      role="admin"
      roles={{
        admin: 0,
        editor: 1,
        guest: 2,
      }}
    />,
  )

  expect(component.props().permissions).toEqual(744)
  expect(toJSON(component)).toMatchSnapshot()

  component.setProps({ role: 'editor' })
  expect(component.props().role).toEqual('editor')
  expect(toJSON(component)).toMatchSnapshot()

  component.setProps({ role: 'guest' })
  expect(component.props().role).toEqual('guest')
  expect(toJSON(component)).toMatchSnapshot()
})

test('Renders the children', () => {
  const component = mount(
    <Permit
      permissions={600}
      role="admin"
      roles={{
        admin: 0,
        editor: 1,
        guest: 2,
      }}
    >
      <span>Hello Admin!</span>
    </Permit>,
  )

  expect(component.props().permissions).toEqual(600)
  expect(toJSON(component)).toMatchSnapshot()

  component.setProps({ role: 'editor' })
  expect(component.props().role).toEqual('editor')
  expect(toJSON(component)).toMatchSnapshot()

  component.setProps({ role: 'guest' })
  expect(component.props().role).toEqual('guest')
  expect(toJSON(component)).toMatchSnapshot()
})
