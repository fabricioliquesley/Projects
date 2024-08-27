import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../style/deviceBreakPoint";

export const Container = styled.main`
    display: grid;
    grid-template-rows: 1fr 60px;
    width: 100%;
    min-height: 100vh;

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        display: flex;
        flex-direction: row-reverse;
        overflow: hidden;
    }
`;

export const Content = styled.section`
    padding: 1.66666rem;

    > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        h2 {
            color: ${({ theme }) => theme.COLORS.GRAY_200};
        }
    }

    > section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    > div:nth-child(2) {
        margin-top: 1rem;
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        flex: 1;
        height: 100vh;
        overflow-y: auto;

        > section {
            width: 100%;
            max-width: 51.875rem;
            margin: 0 auto;
        }
    }
`;

export const Filter = styled.nav`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0 2rem;
    
    svg {
        color: ${({ theme }) => theme.COLORS.BLUE_100};
    }
`;