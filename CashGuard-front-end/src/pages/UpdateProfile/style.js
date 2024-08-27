import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../style/deviceBreakPoint";

export const Container = styled.main`
    display: grid;
    grid-template-rows: max-content max-content auto;
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.COLORS.GRAY_500};

    > div {
        position: relative;
        display: grid;
        place-content: center;
        margin: 2rem auto;

        h1 {
            font-size: 3.3rem;
            font-weight: 900;
            text-transform: uppercase;
            color: ${({ theme }) => theme.COLORS.BLUE_100};
            text-shadow: ${({ theme }) => "0px 0px 30px " + theme.COLORS.BLUE_100};
            
            transition: .4s;
        }
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1.6666666rem;
    
    > a {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    > button {
        display: grid;
        place-content: center;
        font-size: 1.5rem;
        background: transparent;
        color: ${({ theme }) => theme.COLORS.RED_100};
        border: none;
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        width: 100%;
        max-width: 37.5rem;
        margin: 0 auto;
        padding: 1.6666666rem 0;
    }
`;

export const Content = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    width: 100%;
    background: ${({ theme }) => theme.COLORS.GRAY_400};
    border-radius: 2rem 2rem 0 0;
    padding: 1.6666666rem;
    
    > fieldset {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: none;
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        width: 100%;
        max-width: 37.5rem;
        margin: 0 auto;
    }
`;