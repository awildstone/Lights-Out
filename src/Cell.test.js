import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

it("renders without crashing", () => {
    render(<Cell />);
});

it("matches snapshot when lit", () => {
    const { asFragment } = render(<Cell isLit={true} />);
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when not lit", () => {
    const { asFragment } = render(<Cell />);
    expect(asFragment()).toMatchSnapshot();
});