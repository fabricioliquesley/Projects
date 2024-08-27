import { styled } from "styled-components";

import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    img {
        width: 40rem;
    }
    
    > .text {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 20px;
        max-width: 500px;
        padding: 10px;
        border-radius: 8px;
    }

    > .text h1 {
        color: #C4C4CC;
    }

    > .text p {
        font-size: 18px;
        color: #C4C4CC;
    }

    > .text p a {
        color: #92000E;
        font-weight: bolder;
        cursor: pointer;
    }

    > .text .threat {
        display: none;
    }

    @media (max-width: ${DEVICE_BREAKPOINT.MD}) {
        flex-direction: column;

        img {
            width: 30rem;
        }

        > .text p {
        font-size: 16px;
        color: #C4C4CC;
    }
    }
`;