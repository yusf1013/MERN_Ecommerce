import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Modal from "./Modals";
import LoginComp from "./LoginComponent";


export default function LoginRequired({child, onClick}) {
const user = useSelector((state) => state.user.currentUser);
const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const onLoginSuccess = async () => {
            console.log("Why are you here 2", user==null, isOpen);
            if(user && isOpen){
                onClick();
                setIsOpen(false);
            } 
            console.log("Why are you here 2", user==null, isOpen);
        };
        onLoginSuccess();
    }, [user]);

  return (
    <div onClick={() => {
        if(user)
        {
            onClick();
            // setIsOpen(false);
        }
        // setIsOpen(!isOpen);
        else if (!isOpen)
            setIsOpen(true);
        console.log("MOO: ", isOpen)
    }}>
        {child}
        <Modal open={isOpen} onClose={() => {setIsOpen(false); console.log("What", isOpen);}}>
            <LoginComp title = "SIGN IN TO CONTINUE"/>
        </Modal>
    </div>
  )
}
