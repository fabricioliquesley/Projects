import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ $variant }) => $variant == "footer" ? "0.6rem" : "1rem"};
    width: fit-content;
    
    > div {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;

        > img {
            filter: ${({ $variant }) => $variant == "footer" ? "grayscale(1)" : "grayscale(0)"};
            width: ${({ $variant }) => $variant == "footer" ? "1.2rem" : "2.6rem"};
        }

        h1 {
            color: ${({ theme, $variant }) => $variant == "footer" ? theme.COLORS.LIGHT.LIGHT700 : theme.COLORS.LIGHT.LIGHT100};
            font-size: ${({ $variant }) => $variant == "footer" ? "1.1rem" : "2.4rem"};
        }
    
        @media (max-width: ${DEVICE_BREAKPOINT.XS}) {
            h1 {
                font-size: ${({ $variant }) => $variant == "footer" ? "1.1rem" : "2rem"};
            }
        }
    }

    span {
        color: ${({ theme }) => theme.COLORS.TINTS.CAKE200};
        font-size: 1.2rem;
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        flex-direction: column;
        gap: 0;
        align-items: flex-end;
    }
`;