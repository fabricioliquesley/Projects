import { styled } from "styled-components";

import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.div`
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;

    > main {
        overflow: ${({ $statusMenu }) => $statusMenu == "open" ? "hidden" : "auto"};
    }
`;

export const Content = styled.div`
    padding: 5rem 2rem 3rem;
    color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};

    > h2 {
        font-size: 3.2rem;
        font-weight: 500;
        line-height: 140%;
    }

    > .cards {
        display: flex;
        flex-direction: column;
        gap: 3.2rem;
        margin-top: 3rem;

        .mealCard {
            display: flex;
            align-items: center;
            gap: 1.3rem;

            img {
                width: 6rem;
                height: 6rem;
                border-radius: 50%;
                object-fit: cover;
            }

            span {
                color: ${({ theme }) => theme.COLORS.TINTS.CAKE200};
                font-size: 1.6rem;
            }
        }

        p {
            font-size: 2rem;
            font-weight: 500;
            line-height: 160%;
        }

        button {
            align-self: flex-end;
            min-width: 21rem;
        }
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
        "items payment"
        "itemsContainer paymentContainer";
        margin: 0 12.3rem;

        & h2:first-child {
            grid-area: items;
        }

        & h2:nth-child(3) {
            grid-area: payment;
        }
    }
`;