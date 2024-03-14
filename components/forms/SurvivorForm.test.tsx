import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SurvivorForm from './SurvivorForm';

describe('SurvivorForm component', () => {

  const props = {
    showModal: true,
    setShowModal: jest.fn(),
    survivorsList: [],
    setSurvivorsList: jest.fn()
  }

  const inputFields = {
    name: '',
    age: 20,
    gender: '',
    last_location: {
      latitude: '',
      longitude: '',
    },
    inventory: [],
    infected: false,
    date_added: new Date
  }

  // Test firevent on click Add Survivor button
  it('shows alert when fields are empty', () => {
    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { getByRole, getByText } = render(<SurvivorForm {...props} />);
    const addButton = getByRole('button', { name: /Add Survivor/i });
    
    // Click the "Add Survivor" button with some fields empty
    // Add more test field input here
    inputFields.name = ''; // Making the name field empty for testing
    fireEvent.click(addButton);

    // Check if window.alert is called with the expected message
    expect(alertMock).toHaveBeenCalledWith('NAME is empty');

    // Clean up the mock
    alertMock.mockRestore();
  });
});