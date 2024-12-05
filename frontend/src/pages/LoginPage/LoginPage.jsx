import React from "react";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const navigate = useNavigate(); // Get the navigate function
    const [bkID, setbkID] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();
        if (!bkID || !password) {
            alert("BKnetID and Password are required!"); // Show an alert if fields are empty
            return; // Stop the function from proceeding
        }
        try {
            await axios.post("http://localhost:5173/", {
                bkID, password
            }).then(res=>{
                if(res.data=="exist") {
                    navigate("/studentpage", {state:{
                        id:bkID,
                        name:name,
                        purchases:purchases
                    }})
                } else if(res.data == "notexist") {
                    alert("May bi duoi hoc roi kon :))")
                }
            }).catch(e=>{
                alert("Wrong detailed");
                console.log(e)
            })
        }
        catch(e) {
            console.log(e)
        }
    }

  return (
    <body className="flex items-center justify-center">
        <div className="flex w-[1454px] h-[660px] justify-between rounded-[25px] bg-thirdary p-[45px]">
            <img src="/logo-school.png" alt="" className="h-[340px] flex-none mx-auto my-auto pl-[100px]"/>
            <div className="flex-auto flex flex-col items-center justify-center">
                <h3 className="text-[36px] text-secondary font-bold text-center mb-[45px] w-[600px] pl-[200px]">SMART PRINTING</h3>
                <div className="flex">
                    <h4 className="text-[20px] font-bold text-center mb-[45px] w-[200px]" >BKnetID</h4>
                    <input name="bkID" className="h-[40px] rounded-[4px] w-[480px]" value={bkID} onChange={(e)=>{setbkID(e.target.value)}}/>
                </div>
                <div className="flex">
                    <h4 className="text-[20px] font-bold text-center mb-[45px] w-[200px]" >Password</h4>
                    <input name="password" className="h-[40px] rounded-[4px] w-[480px]" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="pl-[200px] flex items-center justify-center">
                    <Button
                        title="Submit"
                        backgroundColor="success"
                        textColor="white"
                        onClick={submit}
                    />
                </div>
            </div>
        </div>
    </body>
  );
}
export default Login;
