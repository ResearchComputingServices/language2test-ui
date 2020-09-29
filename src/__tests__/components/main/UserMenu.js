import React from 'react';
import { shallow } from 'enzyme';
import UserMenu from '../../../components/main/UserMenu';
import { createSnapshotTest } from '../../../testUtilities';

describe('UserMenu', () => {
    it('should match snapshot', createSnapshotTest(UserMenu, {
        props: {
            handleLogout: jest.fn(),
            displayName: '',
        },
    }));

    it('should handle button clicks without crashing', () => {
        const Component = shallow(<UserMenu
            displayName=''
            handleLogout={jest.fn()}
        />);
        Component.find('.user-menu')
            .simulate('click', { currentTarget: <div /> });
    });
});
