import { fireEvent, render, screen } from "@testing-library/react";
import DraggableFormItem from "@/components/common/DraggableFormItem";

jest.mock("react-draggable", () => ({
  __esModule: true,
  default: ({ children, onStart, onStop }: any) => (
    <div
      data-testid="draggable-shell"
      onMouseDown={() => onStart?.()}
      onMouseUp={() => onStop?.({}, { y: 200 })}
    >
      {children}
    </div>
  ),
}));

describe("DraggableFormItem", () => {
  const defaultProps = {
    index: 1,
    totalItems: 3,
    onDragStop: jest.fn(),
    onMove: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("asks for confirmation before deleting", () => {
    render(
      <DraggableFormItem {...defaultProps}>
        <div>Item content</div>
      </DraggableFormItem>
    );

    fireEvent.click(screen.getByTitle("Delete item"));

    expect(screen.getByText("Delete?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Yes" }));

    expect(defaultProps.onDelete).toHaveBeenCalledWith(1);
  });

  it("moves items through the control buttons", () => {
    render(
      <DraggableFormItem {...defaultProps}>
        <div>Item content</div>
      </DraggableFormItem>
    );

    fireEvent.click(screen.getByTitle("Move to top"));
    fireEvent.click(screen.getByTitle("Move up"));
    fireEvent.click(screen.getByTitle("Move down"));
    fireEvent.click(screen.getByTitle("Move to bottom"));

    expect(defaultProps.onMove).toHaveBeenNthCalledWith(1, 1, "top");
    expect(defaultProps.onMove).toHaveBeenNthCalledWith(2, 1, "up");
    expect(defaultProps.onMove).toHaveBeenNthCalledWith(3, 1, "down");
    expect(defaultProps.onMove).toHaveBeenNthCalledWith(4, 1, "bottom");
  });

  it("translates drag stop coordinates into a reorder callback", () => {
    render(
      <DraggableFormItem {...defaultProps}>
        <div>Item content</div>
      </DraggableFormItem>
    );

    fireEvent.mouseDown(screen.getByTestId("draggable-shell"));
    fireEvent.mouseUp(screen.getByTestId("draggable-shell"));

    expect(defaultProps.onDragStop).toHaveBeenCalledWith(1, 2);
  });
});