import React from 'react';
import { render } from '../../../testUtilities';
import Administrator from '../../../components/administrator';

describe('Administrator', () => {
    test('Drawer should have all the necessary items available', () => {
        const { getByText, getAllByText } = render(<Administrator />);
        getAllByText('Users');
        getByText('Student Classes');
        getByText('Test');
        getByText('Instances');
        getByText('Assignations');
        getByText('Sessions');
        getByText('Types');
        getByText('Vocabularies');
        getByText('Reading Comprehensions');
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
