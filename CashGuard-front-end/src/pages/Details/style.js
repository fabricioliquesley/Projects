import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../style/deviceBreakPoint";

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 100%;
    height: 100vh;
    padding: 1.6666666rem;

    @media (min-width: ${DEVICE_BREAKPOINT.MD}) {
        width: 100%;
        max-width: 37.5rem;
        margin: 0 auto;
        padding: 1.6666666rem 0;
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    > a {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.2rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};

        p {
            font-size: 1.2rem;
        }
    }

    div {
        display: flex;
        align-items: center;
        gap: 0.7rem;

        button {
            display: grid;
            place-content: center;
            background: transparent;
            border: none;
            color: ${({ theme }) => theme.COLORS.BLUE_100};

            &:first-child {
                color: ${({ theme }) => theme.COLORS.RED_100};
            }
        }
    }
`;

export const Content = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
`;

export const List = styled.ul`
    max-height: 10rem;
    background: ${({ theme }) => theme.COLORS.GRAY_400};
    margin-top: 2px;
    border: 1px solid ${({ theme }) => theme.COLORS.BLUE_100};
    border-radius: 1rem;
    
    overflow: auto;
`;

export const Option = styled.li`
    padding: 0.7rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.COLORS.GRAY_500};
    }

    > svg {
        font-size: 1.2rem;
    }
`;