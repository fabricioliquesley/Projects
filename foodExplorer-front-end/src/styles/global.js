import { createGlobalStyle } from "styled-components";
import { DEVICE_BREAKPOINT } from "./deviceBreakPoint";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --poppins: "Poppins", sans-serif;
        --roboto: "Roboto", sans-serif;

        font-size: 62.5%;
    }

    body {
        background-color: ${({ theme }) => theme.COLORS.DARK.DARK400};
        font-size: 1.2rem;

        @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
            font-size: 1.6rem;
        }
    }

    body, input, button {
        font-family: var(--poppins);
        font-weight: 400;
        outline: none;
    }

    main::-webkit-scrollbar {
        width: 0.8rem;
    }

    main::-webkit-scrollbar-track {
        background-color: #000A0F;
    }
    
    main::-webkit-scrollbar-thumb {
        background-color: #00070A;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }

    .poppins-regular {
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .poppins-thin {
        font-family: "Poppins", sans-serif;
        font-weight: 100;
        font-style: normal;
    }

    .poppins-extralight {
        font-family: "Poppins", sans-serif;
        font-weight: 200;
        font-style: normal;
    }

    .poppins-light {
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-style: normal;
    }

    .poppins-medium {
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-style: normal;
    }

    .roboto-regular {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .roboto-bold {
        font-family: "Roboto", sans-serif;
        font-weight: 700;
        font-style: normal;
    }

    .roboto-black {
        font-family: "Roboto", sans-serif;
        font-weight: 900;
        font-style: normal;
    }



    /* @media (prefers-color-scheme: dark){
        body {
            background-color: #222222;
            color: white;
        }
    } */
`;