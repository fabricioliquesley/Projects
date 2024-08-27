import { FiHome, FiPlus } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr"

import { MenuContainer, Button } from "./style"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Menu() {
    const [buttonSelected, setButtonSelected] = useState("home");

    function changeButtonSelected(button){
        setButtonSelected(button);

        localStorage.setItem("@cashGuard", button);
    }

    useEffect(() => {
        const selectedButton = localStorage.getItem("@cashGuard");

        if(selectedButton) setButtonSelected(selectedButton);        
    }, [])

    return (
        <MenuContainer>
            <div>
                <Link
                    to={"/"}
                    data-active={buttonSelected == "" || buttonSelected == "home"}
                    onClick={() => changeButtonSelected("home")}
                >
                    <FiHome />
                </Link>
                <Link
                    to={"/transactions"}
                    data-active={buttonSelected == "transactions"}
                    onClick={() => changeButtonSelected("transactions")}
                >
                    <GrTransaction />
                </Link>
            </div>
            <Button to={"/create"}>
                <FiPlus />
            </Button>
        </MenuContainer>
    )
}