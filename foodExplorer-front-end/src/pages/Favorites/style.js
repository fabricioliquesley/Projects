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
        
        h2 {
            color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
            font-size: 3.2rem;
            line-height: 140%;
            margin: 5.6rem 2rem 0;
        }

        @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
            padding: 0 12.3rem;

            h2 {
                margin: 5.6rem 0 0;
            }
        }
    }

`;

export const FavoritesContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    padding: 2.7rem 2rem;

    > div {
        display: flex;
        align-items: center;
        gap: 1.3rem;

        img {
            width: 7rem;
            height: 7rem;
            border-radius: 50%;
            object-fit: cover;
        }

        div {
            line-height: 160%;

            p {
                color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
                font-size: 2rem;
            }

            button {
                background: transparent;
                border: none;
                font-size: 1.2rem;
                color: ${({ theme }) => theme.COLORS.TINTS.TOMATO400};
            }
        }
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 4rem;
        padding: 2.7rem 0;
    }
`;