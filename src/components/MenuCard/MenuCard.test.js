import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MenuCard from './MenuCard';

// Mock the useResponsive hook
jest.mock('../../hooks/useResponsive', () => ({
  useResponsive: jest.fn(),
}));

beforeEach(() => {
  useResponsive.mockClear(); // Clear any previous mock data
});


describe('MenuCard Component', () => {
  const menu = {
    name: 'Spaghetti Carbonara',
    price: 350,
    description: 'Creamy spaghetti with pancetta and parmesan.',
    cloudinaryUrl: 'spaghetti-carbonara',
  };

  test('renders MenuCard component with menu props', () => {
    useResponsive.mockReturnValue({breakPoints: {xs: true}});

    render(<MenuCard menu={menu} />);

    expect(screen.getByText(menu.name)).toBeInTheDocument();
    expect(screen.getByText(`₹${menu.price}`)).toBeInTheDocument();
    expect(screen.getByText(menu.description)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', `https://res.cloudinary.com/ddu2xft2h/image/upload/t_Banner 16:9/${menu.cloudinaryUrl}`);
  });

  test('renders MenuCard component with small screen styles when breakPoints.xs is true', () => {
    useResponsive.mockReturnValue({breakPoints: {xs: true}});

    render(<MenuCard menu={menu} />);

    expect(screen.getByTestId('wrapper').parentElement).toHaveClass('menu-card-wrapper-sm');
  });

  test('does not apply small screen styles when breakPoints.xs is false', () => {
    useResponsive.mockReturnValue({breakPoints: {xs: false}});
    render(<MenuCard menu={menu} />);

    expect(screen.getByText(menu.name).parentElement).not.toHaveClass('menu-card-wrapper-sm');
  });

  test('renders the image with the correct src attribute', () => {
    useResponsive.mockReturnValue({breakPoints: {xs: false}});

    render(<MenuCard menu={menu} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', `https://res.cloudinary.com/ddu2xft2h/image/upload/t_Banner 16:9/${menu.cloudinaryUrl}`);
  });

  test('renders the MenuCard component without the `menu-card-wrapper-sm` class', () => {
    useResponsive.mockReturnValue({breakPoints: {xs: false}});

    render(<MenuCard menu={menu} />);
    
    expect(screen.getByText(menu.name).parentElement).not.toHaveClass('menu-card-wrapper-sm');
  });

  test('applies the correct classes to the card content and image', () => {
    useResponsive.mockReturnValue({breakPoints: {xs: false}});

    render(<MenuCard menu={menu} />);

    expect(screen.getByText(menu.name).parentElement).toHaveClass('menu-card-content-wrapper');
    expect(screen.getByRole('img')).toHaveClass('card-image');
  });

  test('displays correct content for the menu card', () => {
    useResponsive.mockReturnValue({breakPoints: {xs: false}});

    render(<MenuCard menu={menu} />);

    expect(screen.getByText(menu.name)).toHaveTextContent(menu.name);
    expect(screen.getByText(`₹${menu.price}`)).toHaveTextContent(`₹${menu.price}`);
    expect(screen.getByText(menu.description)).toHaveTextContent(menu.description);
  });

  test('shows empty content if menu props are undefined', () => {
    useResponsive.mockReturnValue({breakPoints: {xs: false}});

    render(<MenuCard menu={{}} />);

    expect(screen.queryByText(menu.name)).not.toBeInTheDocument();
    expect(screen.queryByText(`₹${menu.price}`)).not.toBeInTheDocument();
    expect(screen.queryByText(menu.description)).not.toBeInTheDocument();
  });
});
