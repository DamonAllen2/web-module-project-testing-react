import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

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

test('renders without errors', () => { 
    render(<Show show={mockShowData} selectedSeason={"none"}/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={"none"}/>);
    const loading = screen.queryByTestId("loading-container");
    expect(loading).toBeInTheDocument();
 });

test('renders same number of options seasons are passed in', () => {
    render(<Show show={mockShowData} selectedSeason={"none"}/>);
    const dropdown = screen.queryAllByTestId('season-option')
    expect(dropdown).toHaveLength(5)
 });

test('handleSelect is called when an season is selected', async () => { 
    const handleSelect = jest.fn();
    render(<Show show={mockShowData} selectedSeason={"none"} handleSelect={handleSelect} />);
    const select = screen.getByLabelText(/select a season/i)
     userEvent.selectOptions(select, ['1']);
     await waitFor(() =>expect(handleSelect).toBeCalled());
});

test('component renders when no seasons are selected and when rerenders with a season passed in', async () => {
    const { rerender } = render(<Show show={mockShowData} selectedSeason={"none"}/>)
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();
    rerender(<Show show={mockShowData} selectedSeason={1}/>)
    await waitFor(() => episodes = screen.queryByTestId('episodes-container'))
    expect(episodes).toBeInTheDocument();
 });
