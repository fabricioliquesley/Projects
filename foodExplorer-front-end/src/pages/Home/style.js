import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    
    > main {
        overflow: ${({ $statusMenu }) => $statusMenu == "open" ? "hidden" : "auto"};
        padding-bottom: 6.2rem;
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        > main {
            padding: 0 12.3rem 6.2rem;
        }
    }
`;