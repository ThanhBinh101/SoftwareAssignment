import Button from "../Button";
import Selection from "./Selection";
import {
  AVAILABLE_PAPER_SIZE,
  AVAILABLE_PRINTER_OPTION,
} from "../../libs/constant";
import Input from "./Input";
import InputRadio from "./InputRadio";
import PageSelection from "./PageSelection";
import { useAppContext } from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";

const InputInformation = () => {
  const navigate = useNavigate();
  const {
    pagesSelection,
    setPagesSelection,
    printerID,
    setPrinterID,
    copiesNumber,
    setCopiesNumber,
    paperSize,
    setPaperSize,
    orientation,
    setOrientation,
  } = useAppContext();
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-10 text-[22px] font-medium">
        <Selection
          title={"PrinterID"}
          id={"printer_id"}
          options={AVAILABLE_PRINTER_OPTION}
          state={printerID}
          setState={setPrinterID}
        />
        <Input
          id={"copies_number"}
          title={"Copies"}
          type={"number"}
          state={copiesNumber}
          setState={setCopiesNumber}
        />
        <PageSelection state={pagesSelection} setState={setPagesSelection} />
        <Selection
          title={"Paper Size"}
          id={"paper_size"}
          options={AVAILABLE_PAPER_SIZE}
          state={paperSize}
          setState={setPaperSize}
        />
        <InputRadio state={orientation} setState={setOrientation} />
        <div className="flex items-center justify-center gap-20">
          <Button
            title="Cancel"
            textColor={"secondary"}
            backgroundColor={"thirdary"}
            onClickFunction={() => navigate("/")}
          />
          <Button
            type="submit"
            title="Print"
            textColor={"white"}
            backgroundColor={"success"}
          />
        </div>
      </div>
    </div>
  );
};
export default InputInformation;
