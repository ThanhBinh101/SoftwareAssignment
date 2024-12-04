import { BUTTON_VIEW_REPORT } from "../../../libs/constant";
import Button from "../../Button";
import { useNavigate } from 'react-router-dom';

const AdminViewReportButton = () => {
  const navigate = useNavigate();
  function onClickButton() {
      navigate("/adminReport");
  }

  return (
    <div className="flex justify-between">
        <Button
          title="Report"
          backgroundColor="secondary"
          textColor="white"
          onClickFunction={onClickButton}
        />
    </div>
  );
};
export default AdminViewReportButton;