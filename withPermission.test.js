import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Permit from './Permit'
import withPermission from './withPermission'

configure({ adapter: new Adapter() })

const config = {
  permissions: 600,
  role: 'admin',
  roles: {
    admin: 0,
    editor: 1,
    guest: 2,
  },
}
const AdminComponent = () => <span>Hello Admin!</span>
const PermitAdminComponent = withPermission(config)(AdminComponent)

test('Renders the HOC', () => {
  const component = shallow(<PermitAdminComponent />)

  expect(component.props().permissions).toEqual(600)
  expect(toJSON(component)).toMatchSnapshot()
})
