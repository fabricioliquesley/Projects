import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.COLORS.GRADIENTS.GRADIENTS200};
    border-radius: 0.2917rem;
    margin: 4.4rem 2rem;
    padding: 1rem;

    > .imgContainer {
        position: absolute;
        bottom: 0;
        left: -3rem;
        width: 15rem;
        height: 15rem;
        overflow: hidden;

        > img {
            position: absolute;
            width: 20rem;
            bottom: -15rem;
            opacity: 0.8;
            transform: scaleX(-1);
        }
    }
    
    > .text {
        width: 20rem;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
        z-index: 1;
        margin: 0 1rem 0 auto;
        /* background: red; */

        h2 {
            font-size: 1.8rem;
        }

        p {
            font-size: 1.2rem;
        }
    }

    @media (min-width: ${DEVICE_BREAKPOINT.SM}) {
        > .text {
            margin: 0 auto;
        }
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        height: 26rem;
        margin: 9rem 0 0;
        padding: 0;

        > .imgContainer {
            left: -4rem;
            width: 49rem;
            height: 34.3rem;

            > img {
                bottom: -30rem;
                width: 50rem;
            }
        }

        > .text {
            margin-left: 25rem;
            width: max-content;

            h2 {
                font-size: 4rem;
                line-height: 140%;
            }

            p {
                font-size: 1.6rem;
            }
        }
    }
`;