import { useCallback, useState } from "react"
import "../App.css"

const SelectableGrid = ({ rows = 10, columns = 10 }) => {
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedBoxes, setSelectedBoxes] = useState([]);

    const handleMouseDown = (boxNumber) => {
        setIsSelecting(true);
        setSelectedBoxes([boxNumber])
    }

    const handleMouseEnter = useCallback((boxNumber) => {
        if (isSelecting) {
            const startBox = selectedBoxes[0];
            const endBox = boxNumber;

            const startRow = Math.floor((startBox - 1) / columns);
            const startCol = (startBox - 1) % columns;
            const endRow = Math.floor((endBox - 1) / columns);
            const endCol = (endBox - 1) % columns;

            console.log(startRow, startCol, endRow, endCol);
            const minRow = Math.min(startRow, endRow);
            const maxRow = Math.max(startRow, endRow);
            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);


            const selected = [];

            for (let row = minRow; row <= maxRow; row++) {
                for (let col = minCol; col <= maxCol; col++) {
                    selected.push(row * columns + col + 1)
                }
            }

            console.log(selected);
            setSelectedBoxes(selected);
        }
    }, [isSelecting])

    const handleMouseUp = () => {
        setIsSelecting(false)
    }
    return (
        <div
            className='grid-template'
            style={{ "--cols": columns, "--rows": rows }}
            onMouseUp={handleMouseUp}
        >
            {[...Array(rows * columns).keys()].map((_, i) => (
                <div
                    key={i}
                    className={`grid-box flex-center p-1 ${selectedBoxes.includes(i + 1) ? 'selected' : ''}`}
                    onMouseDown={() => handleMouseDown(i + 1)}
                    onMouseEnter={() => handleMouseEnter(i + 1)}
                    title={i+1}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    )
}

export default SelectableGrid