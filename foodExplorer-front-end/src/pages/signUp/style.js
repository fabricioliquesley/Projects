import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3.2rem;
    width: 100%;
    height: 100vh;
    
    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        flex-direction: row;
        justify-content: space-between;
        max-width: 80rem;
        margin: 0 auto;

        > div img {
            width: 4rem;
        }

        > div h1 {
            font-size: 3.2rem;
        }
    }
`;