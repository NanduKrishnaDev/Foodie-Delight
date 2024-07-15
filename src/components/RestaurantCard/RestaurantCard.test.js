import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RestaurantCard from './RestaurantCard';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';
import starIcon from './../../assets/icons/star.png';

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock the useResponsive hook
jest.mock('../../hooks/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

describe('RestaurantCard Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useResponsive.mockReturnValue({ breakPoints: { md: false } });  // Default breakpoint setting
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const restaurant = {
    id: 1,
    name: 'Test Restaurant',
    cuisines: ['Italian', 'Pizza'],
    cloudinaryUrl: 'test-image.jpg',
    rating: 4.5,
    deliveryTime: 30,
    lowestPrice: 500,
  };

  test('should render RestaurantCard component with restaurant data', () => {
    render(<RestaurantCard restaurant={restaurant} />);

    // Check if restaurant details are rendered
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Italian, Pizza')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('30 MINS')).toBeInTheDocument();
    expect(screen.getByText('500 FOR TWO')).toBeInTheDocument();

    // Check if the star icon image is present and has the correct src
    expect(screen.getByAltText('rating star')).toHaveAttribute('src', starIcon);
    
    // Check the main image source and alt text
    expect(screen.getByAltText('Test Restaurant image')).toHaveAttribute(
      'src', 'https://res.cloudinary.com/ddu2xft2h/image/upload/t_Banner 16:9/test-image.jpg'
    );
  });

  test('should navigate to the restaurant details page on click', () => {
    render(<RestaurantCard restaurant={restaurant} />);

    // Click on the card to navigate
    fireEvent.click(screen.getByAltText('Test Restaurant image'));

    // Ensure navigation to the correct URL
    expect(mockNavigate).toHaveBeenCalledWith('restaurant/1');
  });

  test('should apply the correct class based on breakpoints', () => {
    // Test with `md` breakpoint set to true
    useResponsive.mockReturnValue({ breakPoints: { sm: true } });

    render(<RestaurantCard restaurant={restaurant} />);

    // Check if the correct class is applied for `md` breakpoint
    expect(screen.getByAltText('Test Restaurant image').parentElement).toHaveClass('card-container-md');
  });

  test('should not apply the `card-container-md` class if `md` breakpoint is false', () => {
    // Default breakpoint setting
    render(<RestaurantCard restaurant={restaurant} />);

    // Check if the class is not applied
    expect(screen.getByAltText('Test Restaurant image').parentElement).not.toHaveClass('card-container-md');
  });

  test('should have the correct image alt text and src', () => {
    render(<RestaurantCard restaurant={restaurant} />);

    // Check if the image has the correct alt text and src
    expect(screen.getByAltText('Test Restaurant image')).toHaveAttribute('src', 'https://res.cloudinary.com/ddu2xft2h/image/upload/t_Banner 16:9/test-image.jpg');
  });

  test('should have the correct star icon src and alt text', () => {
    render(<RestaurantCard restaurant={restaurant} />);

    // Check if the star icon image has the correct src and alt text
    expect(screen.getByAltText('rating star')).toHaveAttribute('src', starIcon);
  });
});
