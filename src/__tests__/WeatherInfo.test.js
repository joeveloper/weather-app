// src/__tests__/WeatherInfo.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherInfo from '../components/WeatherInfo';

describe('WeatherInfo Component', () => {
    const mockData = {
        name: "London",
        main: {
            temp: "62.60 °F",
            humidity: 80,
        },
        wind: {
            speed: 3.5, // m/s
        },
        weather: [
            { description: "clear sky" },
        ],
    };

    const mockAddToFavorites = jest.fn();

    it('renders weather information', () => {
        render(<WeatherInfo data={mockData} onAddToFavorites={mockAddToFavorites} />);

        expect(screen.getByText(/London/i)).toBeInTheDocument();
        expect(screen.getByText(/62.60 °F/i)).toBeInTheDocument();
        expect(screen.getByText(/80/i)).toBeInTheDocument();
        expect(screen.getByText(/3.5/i)).toBeInTheDocument();
        expect(screen.getByText(/clear sky/i)).toBeInTheDocument();

    })

    it('calls onAddToFavorites with the correct city name', () => {
        render(<WeatherInfo data={mockData} onAddToFavorites={mockAddToFavorites} />);

        // Get the "Add to Favorites" button and click it
        const button = screen.getByText(/Add to favorites/i);
        fireEvent.click(button);

        // Check if the onAddToFavorites function was called with the correct city name
        expect(mockAddToFavorites).toHaveBeenCalledWith("London");
    });
});
