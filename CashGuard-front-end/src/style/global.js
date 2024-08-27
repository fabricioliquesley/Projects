import { createGlobalStyle } from "styled-components";
import { DEVICE_BREAKPOINT } from "./deviceBreakPoint";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 12px;

        @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
            font-size: 16px;
        }
    }

    body {
        background: ${({ theme }) => theme.COLORS.GRAY_400};
    }

    body, input, button {
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        outline: none;
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

    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    
    ::-webkit-scrollbar-track {
        /* background-color: ${({ theme }) => theme.COLORS.GRAY_400}; */
    }
    
    ::-webkit-scrollbar-thumb {
        /* background-color: ${({ theme }) => theme.COLORS.BLUE_100}; */
    }
`;