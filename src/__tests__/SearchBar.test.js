// src/__tests__/SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
    it('renders input and search button', () => {
        render(<SearchBar />);
        expect(screen.getByPlaceholderText(/search city.../i)).toBeInTheDocument();
        expect(screen.getByText(/search/i)).toBeInTheDocument();
    });

    it('updates input value when typed into', () => {
        render(<SearchBar />);
        const input = screen.getByPlaceholderText(/search city/i);
        fireEvent.change(input, { target: { value: 'London' } });
        expect(input.value).toBe('London');
    });

});


