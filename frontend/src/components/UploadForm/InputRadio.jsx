import { IoTabletLandscape, IoTabletPortrait } from "react-icons/io5";

const InputRadio = ({ state, setState }) => {
  const handleOnChange = (e) => {
    setState(e.target.value);
  };
  return (
    <div className="flex">
      <div className="flex-1">Orientation</div>
      <div className="flex flex-1">
        <div className="flex flex-1 items-center">
          <input
            type="radio"
            name="orientation"
            id="portrait"
            value={"portrait"}
            onChange={handleOnChange}
            checked={state === "portrait" ? "checked" : ""}
          />
          <label htmlFor="portratit" className="ml-3 inline-flex items-center">
            <IoTabletPortrait className="mr-3 inline-block text-secondary" />
            Portrait
          </label>
        </div>
        <div className="flex flex-1 items-center">
          <input
            type="radio"
            name="orientation"
            id="landscape"
            value={"landscape"}
            onChange={handleOnChange}
            checked={state === "landscape" ? "checked" : ""}
          />
          <label htmlFor="landscape" className="ml-3 flex items-center">
            <IoTabletLandscape className="mr-3 inline-block text-secondary" />
            Landscape
          </label>
        </div>
      </div>
    </div>
  );
};
export default InputRadio;
