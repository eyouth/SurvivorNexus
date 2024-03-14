import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Survivors from '.';
import SurvivorForm from '@/components/forms/SurvivorForm';

// Mocking NextRouter
jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

describe('Survivors component', () => {

  it('renders list of survivors', () => {

    render(<Survivors />);
    
    // Check if the component renders the heading
    expect(screen.getByText('List of Survivors')).toBeInTheDocument();

    // Assertions based on your component structure and content
    expect(screen.getByText('Ellie Williams')).toBeInTheDocument();
    // Add more ....
  });

  it('displays the correct number of survivors', () => {
    render(<Survivors />);

    // Assuming there are 5 survivors in the data
    expect(screen.getAllByRole("row").length-2).toBe(5) // Subtract thead and tfoot rows
  });

  describe('Add More button', () => {
    const props = {
      showModal: true,
      setShowModal: jest.fn(),
      survivorsList: [],
      setSurvivorsList: jest.fn()
    }

    it('renders the modal when showModal is true', () => {

      const { container } = render(<SurvivorForm {...props} />);
    
      // Check if the modal section has the 'block' class when showModal is true
      const modalElement = container.querySelector('.modal');
      expect(modalElement).toHaveClass('block');
      expect(modalElement).not.toHaveClass('hidden'); 
    })

    it('does not render the modal when showModal is false', () => {
      const props = {
        showModal: false,
        setShowModal: jest.fn(),
        survivorsList: [],
        setSurvivorsList: jest.fn()
      };
  
      const { container } = render(<SurvivorForm {...props} />);
    
      // Check if the modal section has the 'hidden' class when showModal is false
      const modalElement = container.querySelector('.modal');
      expect(modalElement).toHaveClass('hidden');
      expect(modalElement).not.toHaveClass('block');
    });

    // Check Add Survivor button if displayed
    it('renders the "Add Survivor" button', () => {
      const { getByRole } = render(<SurvivorForm {...props} />);
      const addButton = getByRole('button', { name: /Add Survivor/i });
      expect(addButton).toBeInTheDocument();
    });

  })

});