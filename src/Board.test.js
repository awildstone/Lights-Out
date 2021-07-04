import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("render the board", () => {

    it("renders a Board without crashing", () => {
        render(<Board />);
    });

    it("matches the snapshot for all lights off", () => {
        const { asFragment } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("matches the snapshot for all lights on", () => {
        const { asFragment } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("correct cells change when a cell is clicked", () => {

    it("toggles the correct lights", () => {
        const { queryAllByTestId } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
        const cells = queryAllByTestId("light");
    
        // all cells start out as lit
        cells.forEach(cell => {
            expect(cell).toHaveClass("Cell-lit");
        });

        // click on the middle cell
        fireEvent.click(cells[4]);

        let lightsOffIndexes = [1, 3, 4, 5, 7];

        cells.forEach((cell, i) => {
            if (lightsOffIndexes.includes(i)) {
                expect(cell).not.toHaveClass("Cell-lit");
            } else {
                expect(cell).toHaveClass("Cell-lit");
            }
        });
    });
});

describe("displays win message when the game is won", () => {

    it("displays the win message", () => {
        const { queryByText, queryAllByTestId } = render(<Board nrows={1} ncols={3} chanceLightStartsOn={1} />);

        // the game isn't won yet
        expect(queryByText("YOU WIN!")).not.toBeInTheDocument();
      
      // clicking on the middle cell wins the game
      const cells = queryAllByTestId("light");
      fireEvent.click(cells[1]);
      expect(queryByText("YOU WIN!")).toBeInTheDocument();
    });

});