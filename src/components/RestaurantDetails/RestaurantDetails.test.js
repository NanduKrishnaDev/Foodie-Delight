import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantDetails from './RestaurantDetails';
import { toast } from 'react-toastify';
import * as restaurantSlice from './../../redux/restaurant/restaurantSlice';
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
  remove: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

const mockRestaurant = {
  id: 1,
  name: 'Restaurant 1',
  deliveryTime: 30,
  rating: 4.5,
  lowestPrice: 100,
  description: 'A nice place',
  cuisines: ['Italian', 'Mexican'],
  menu: [
    { id: 1, name: 'Pasta' },
    { id: 2, name: 'Tacos' },
  ],
  locationUrl: 'https://maps.google.com',
};

describe('RestaurantDetails Component', () => {
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
        restaurants: [mockRestaurant],
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render restaurant details correctly', () => {
    render(<RestaurantDetails />);

    expect(screen.getByText('Restaurant 1')).toBeInTheDocument();
    expect(screen.getByText('₹100 FOR TWO')).toBeInTheDocument();
    expect(screen.getByText('Menu Listing')).toBeInTheDocument();
  });

  test('should delete a restaurant and navigate to home', () => {
    render(<RestaurantDetails />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(dispatch).toHaveBeenCalledWith(restaurantSlice.remove(1));
    expect(navigate).toHaveBeenCalledWith('/');
    expect(toast.success).toHaveBeenCalledWith('Restaurant deleted successfully!', { position: 'top-right' });
  });

  test('should navigate to modify page when modify button is clicked', () => {
    render(<RestaurantDetails />);

    const modifyButton = screen.getByText('Modify');
    fireEvent.click(modifyButton);

    expect(navigate).toHaveBeenCalledWith('/restaurant/1/modify');
  });
});
