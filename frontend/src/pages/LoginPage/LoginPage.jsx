import React from "react";
import Button from "../../components/Button";
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate(); // Get the navigate function

    function onClickButton() {
        navigate("/studentpage"); // Use navigate to go to the new page
    }

  return (
    <body className="flex items-center justify-center">
        <div className="flex w-[1454px] h-[660px] justify-between rounded-[25px] bg-thirdary p-[45px]">
            <img src="/logo-school.png" alt="" className="h-[340px] flex-none mx-auto my-auto pl-[100px]"/>
            <div className="flex-auto flex flex-col items-center justify-center">
                <h3 className="text-[36px] text-secondary font-bold text-center mb-[45px] w-[600px] pl-[200px]">SMART PRINTING</h3>
                <div className="flex">
                    <h4 className="text-[20px] font-bold text-center mb-[45px] w-[200px]" >BKnetID</h4>
                    <input name="id" className="h-[40px] rounded-[4px] w-[480px]"/>
                </div>
                <div className="flex">
                    <h4 className="text-[20px] font-bold text-center mb-[45px] w-[200px]" >Password</h4>
                    <input name="id" className="h-[40px] rounded-[4px] w-[480px]"/>
                </div>
                <div className="pl-[200px] flex items-center justify-center">
                    <Button
                        title="Submit"
                        backgroundColor="success"
                        textColor="white"
                        onClickFunction={onClickButton}
                    />
                </div>
            </div>
        </div>
    </body>
  );
}
export default Login;
