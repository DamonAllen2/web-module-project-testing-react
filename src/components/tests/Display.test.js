import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from './../../api/fetchShow'

jest.mock('./../../api/fetchShow')

const mockShowData = {
    image: {
        medium: "https://static.tvmaze.com/uploads/images/medium_portrait/396/991288.jpg",
        original: "https://static.tvmaze.com/uploads/images/original_untouched/396/991288.jpg"
    },
    name: "Stranger Things",
    seasons: [
        {
            id: 0,
            name: "Season 1",
            episodes: []
        },
        {
            id: 1,
            name: "Season 2",
            episodes: []
        } , 
        {
            id: 2,
            name: "Season 3",
            episodes: []
        }  ,
        {
            id: 3,
            name: "Season 4",
            episodes: []
        } , 
        {
            id: 4,
            name: "Season 5",
            episodes: []
        }      
    ],
    summary: "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl."
}

test('renders without errors with no props', async () => {
    render(<Display />)
 });

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(mockShowData)
    render(<Display />);
    const button = screen.getByRole('button');
    fireEvent.click(button)
    const testShows = await screen.findByTestId('show-container');
    expect(testShows).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(mockShowData)
    render(<Display />);
    const button = screen.getByRole('button');
    fireEvent.click(button)
    await waitFor(() => {
        const options = screen.queryAllByTestId('season-option');
        expect(options).toHaveLength(5);
    })
 });
