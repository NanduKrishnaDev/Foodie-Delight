import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddRestaurant from './AddRestaurant';
import { toast } from 'react-toastify';
import { useResponsive } from '../../hooks/useResponsive';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('../../hooks/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

jest.mock('./../../redux/restaurant/restaurantSlice', () => ({
  initialAdd: jest.fn(),
  add: jest.fn(),
  modify: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

// Mock restaurants data
const mockRestaurants = [
  { id: 1, name: 'Restaurant 1', locationUrl: 'http://example.com/1' },
  { id: 2, name: 'Restaurant 2', locationUrl: 'http://example.com/2' },
];

describe('AddRestaurant Component', () => {
  let dispatch;
  let navigate;

  beforeEach(() => {
    dispatch = jest.fn();
    navigate = jest.fn();

    useDispatch.mockReturnValue(dispatch);
    useParams.mockReturnValue({ resId: '1' });
    useNavigate.mockReturnValue(navigate);
    useResponsive.mockReturnValue({ breakPoints: { md: false, xs: false } });

    useSelector.mockImplementation((selector) =>
      selector({
        restaurants: mockRestaurants,
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render AddRestaurant component correctly', () => {
    useParams.mockReturnValue({});

    render(<AddRestaurant />);

    expect(screen.getByText('Add Restaurant and feed the hungry!')).toBeInTheDocument();
    expect(screen.getByLabelText('name')).toBeInTheDocument();
    expect(screen.getByLabelText('location URL')).toBeInTheDocument();
    expect(screen.getByLabelText('rating')).toBeInTheDocument();
    expect(screen.getByLabelText('cuisines')).toBeInTheDocument();
    expect(screen.getByLabelText('description')).toBeInTheDocument();
  });

  test('should display error validations and messages', () => {
    useParams.mockReturnValue({});
    render(<AddRestaurant />);

    fireEvent.click(screen.getByText('Add'));

    
    expect(screen.getByText('Enter a valid description')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid name')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid locationUrl')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid rating')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid cuisines')).toBeInTheDocument();
  });

  test('should dispatch add action and navigate on Add button click', () => {
    useParams.mockReturnValue({});

    render(<AddRestaurant />);

    // Example: simulate input change and button click
    fireEvent.change(screen.getByTestId('name'), { target: { value: 'McDonalds' } });
    fireEvent.change(screen.getByTestId('rating'), { target: { value: '5' } });
    fireEvent.change(screen.getByTestId('location URL'), { target: { value: 'https://google' } });
    fireEvent.change(screen.getByTestId('cuisines'), { target: { value: 'italia' } });
    fireEvent.change(screen.getByTestId('description'), { target: { value: 'sample' } });


    fireEvent.click(screen.getByText('Add'));

    // // Example: verify dispatch and navigate calls
    expect(dispatch).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/');
  });

  test('should modify a restaurant when Modify button is clicked', () => {
    useParams.mockReturnValue({ resId: '1' });

    render(<AddRestaurant />);

    fireEvent.change(screen.getByTestId('name'), { target: { value: 'McDonalds' } });
    fireEvent.change(screen.getByTestId('rating'), { target: { value: '5' } });
    fireEvent.change(screen.getByTestId('location URL'), { target: { value: 'https://google' } });
    fireEvent.change(screen.getByTestId('cuisines'), { target: { value: 'italia' } });
    fireEvent.change(screen.getByTestId('description'), { target: { value: 'sample' } });

    fireEvent.click(screen.getByText('Modify'));

    expect(dispatch).toHaveBeenCalled(); // Check if the modify action was dispatched
    expect(navigate).toHaveBeenCalledWith('/'); // Check if navigation occurred
    expect(toast.success).toHaveBeenCalledWith('Restaurant modified successfully!', { position: 'top-right' }); // Check if toast message was shown
  });
});
