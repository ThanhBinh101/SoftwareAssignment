import { Link } from "react-router-dom";
import { BUTTON_USER_OVERVIEW } from "../../libs/constant";
import Button from "../Button";

const UserOverviewButtonList = ({id}) => {
  return (
    <div className="flex justify-between">
      {BUTTON_USER_OVERVIEW.map((button) => (
        <Link key={button.title} to={`${button.link}/${id}`}>
          <Button
            title={button.title}
            textColor={button.textColor}
            backgroundColor={button.backgroundColor}
            width={"60"}
          />
        </Link>
      ))}
    </div>
  );
};
export default UserOverviewButtonList;
