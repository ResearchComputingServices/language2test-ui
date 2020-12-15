import React from 'react';
import { render } from '../../../testUtilities';
import MainDrawer from '../../../components/mainDrawer';

describe('MainDrawer', () => {
    test('Drawer should have all the necessary items available', () => {
        const { getByText, getAllByText } = render(<MainDrawer />);
        getAllByText('Users');
        getByText('Student Classes');
        getByText('Test');
        getByText('Instances');
        getByText('Assignations');
        getByText('Sessions');
        getByText('Types');
        getByText('Vocabularies');
        getByText('Readings');
        getByText('Clozes');
        getByText('Writings');
        getByText('Settings');
        getByText('Test Categories');
        getByText('Demographic Fields');
        getByText('User Field Types');
        getByText('Enumerations');
        getAllByText('Roles');
    });
});
