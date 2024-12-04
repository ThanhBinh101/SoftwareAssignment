/* eslint-disable react/prop-types */
import { useAppContext } from "../../hooks/useAppContext";

const PageSelection = ({ state, setState }) => {
  const {
    rangeSelectionStartPage,
    setRangeSelectionStartPage,
    rangeSelectionEndPage,
    setRangeSelectionEndPage,
    selection,
    setSelection,
  } = useAppContext();

  const handleClickCheckBox = (e) => {
    setState(e.target.value);
  };

  const handleRangeInput = (e) => {
    if (e.target.name === "range-start") {
      setRangeSelectionStartPage(e.target.value);
    } else if (e.target.name === "range-end") {
      setRangeSelectionEndPage(e.target.value);
    }
  };

  const handleSelectionInput = (e) => {
    let value = e.target.value;
    value = value.replaceAll(" ", "");
    const selectionArray = value.split(",");
    setSelection(selectionArray);
  };

  const selectionValue = selection.length > 0 ? selection.join(",") : "";

  return (
    <div className="flex">
      <label htmlFor="" className="flex-1">
        Pages
      </label>
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <input
            type="radio"
            name="pages"
            id="all"
            className="mr-3"
            onChange={handleClickCheckBox}
            value={"all"}
            checked={state === "all" ? "checked" : ""}
          />
          <label htmlFor="all">All</label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <input
              type="radio"
              name="pages"
              id="range"
              className="mr-3"
              onChange={handleClickCheckBox}
              value={"range"}
              checked={state === "range" ? "checked" : ""}
            />
            <label htmlFor="range">Range from</label>
          </div>
          {state === "range" ? (
            <div className="flex items-center gap-4">
              <input
                className="w-[60px] rounded-[16px] border-[1px] border-secondary bg-thirdary p-2"
                type="number"
                name="range-start"
                value={rangeSelectionStartPage}
                id=""
                onChange={handleRangeInput}
                min={0}
              />
              to
              <input
                className="w-[60px] rounded-[16px] border-[1px] border-secondary bg-thirdary p-2"
                type="number"
                name="range-end"
                value={rangeSelectionEndPage}
                id=""
                onChange={handleRangeInput}
                min={0}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center">
          <div className="flex-1">
            <input
              type="radio"
              name="pages"
              id="selection"
              className="mr-3"
              onChange={handleClickCheckBox}
              value={"selection"}
              checked={state === "selection" ? "checked" : ""}
            />
            <label htmlFor="selection">Selection</label>
          </div>
          {state === "selection" ? (
            <div className="flex-1">
              <input
                type="text"
                className="w-full rounded-[16px] border-[1px] border-secondary bg-thirdary p-2"
                onChange={handleSelectionInput}
                value={selectionValue}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default PageSelection;
