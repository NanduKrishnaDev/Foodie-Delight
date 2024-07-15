import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantListing from './RestaurantListing';
import { useResponsive } from '../../hooks/useResponsive';
import { useSelector, useDispatch } from 'react-redux';
import restaurants from './../../Restaurants';
import { initialAdd } from './../../redux/restaurant/restaurantSlice';

// Mock the useSelector and useDispatch hooks from react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the RestaurantCard component
jest.mock('./../RestaurantCard/RestaurantCard', () => ({
  __esModule: true,
  default: (props) => <div data-testid="restaurant-card" {...props} />,
}));

// Mock the restaurants data
const mockRestaurants = [
  { id: 1, name: 'Restaurant 1', description: 'Delicious food', locationUrl: 'http://example.com/1' },
  { id: 2, name: 'Restaurant 2', description: 'Tasty meals', locationUrl: 'http://example.com/2' },
];

// Mock the initialAdd action
jest.mock('./../../redux/restaurant/restaurantSlice', () => ({
  initialAdd: jest.fn(() => ({ type: 'restaurant/initialAdd' })),
}));

describe('RestaurantListing Component', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the list of restaurant cards', () => {
    // Mock the state with data
    useSelector.mockImplementation(callback => callback({ restaurants: mockRestaurants }));

    render(<RestaurantListing />);

    // Check if RestaurantCard components are rendered
    const restaurantCards = screen.getAllByTestId('restaurant-card');
    expect(restaurantCards).toHaveLength(mockRestaurants.length);
  });

  test('should not dispatch initialAdd action if restaurantsList is not empty', () => {
    // Mock the state to have data
    useSelector.mockImplementation(callback => callback({ restaurants: mockRestaurants }));

    render(<RestaurantListing />);

    // Check that the initialAdd action is not dispatched
    expect(dispatch).not.toHaveBeenCalledWith(initialAdd(restaurants));
  });
});
