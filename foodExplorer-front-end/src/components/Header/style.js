import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.header`
    /* position: sticky;
    top: 0;
    z-index: 3; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.DARK.DARK700};
    padding: 2rem;

    > button {
        display: grid;
        place-content: center;
        background: transparent;
        border: none;
    }

    > button > svg, a > svg {
        font-size: 2.4rem;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT100};
    }

    .historyBtn {
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
        font-size: 1.6rem;
    }

    > div {
        width: fit-content;

        img {
            width: 1.6rem;
        }

        h1 {
            font-size: 1.6rem;
        }
    }

    > .orders {
        position: relative;

        > .ordersNotification {
            position: absolute;
            top: -3px;
            right: -3px;
            display: grid;
            place-content: center;
            width: 1.5rem;
            height: 1.5rem;
            background-color: ${({ theme }) => theme.COLORS.TINTS.TOMATO100};
            color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT100};
            font-size: 1rem;
            border-radius: 50%;
        }
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        padding: 2.4rem 6rem;
        gap: 2.4rem;

        > a {
            color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
            font-size: 1.2rem;
        }

        > div:has(> input) {
            flex: 1;
        }

        > .orders, .newMeal {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            background: ${({ theme }) => theme.COLORS.TINTS.TOMATO100};
            color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT100};
            padding: 1.2rem 3.2rem;
            border-radius: 0.5rem;

            p {
                font-size: 1.4rem;
                line-height: 2.4rem;
            }
        }
    }

    @media (min-width: ${DEVICE_BREAKPOINT.XL}) {
        padding: 2.4rem 12.3rem;
        gap: 3.2rem;
    }
`;