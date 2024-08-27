import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    max-width: 100vw;
    /* border: 1px solid red; */
    padding-left: 2rem;
    margin-top: 3.2rem;

    > h3, .title, button, span {
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
    }

    .slider {
        position: relative;
        width: 100%;
        
        .slide {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.2rem;
            width: 20rem;
            height: fit-content;
            background: ${({ theme }) => theme.COLORS.DARK.DARK200};
            border: 1px solid ${({ theme }) => theme.COLORS.DARK.DARK300};
            border-radius: 0.8rem;
            padding: 2.4rem;
            cursor: pointer;

            .favoriteBtn {
                position: absolute;
                top: 1.6rem;
                right: 1.6rem;
                width: fit-content;
                display: grid;
                place-content: center;
                background: transparent;
                border: none;
                font-size: 2.5rem;

                > svg.favorite {
                    color: #f11b91;
                }
            }

            img {
                width: 10rem;
                height: 10rem;
                border-radius: 50%;
                object-fit: cover;
            }

            .title {
                font-size: 1.4rem;
                text-align: center;
                line-height: 2.4rem;

                &::after {
                    content: " >";
                }
            }

            .price {
                color: ${({ theme }) => theme.COLORS.TINTS.CAKE200};
                font-size: 1.6rem;
            }

            div {
                display: flex;
                align-items: center;
                gap: 1.4rem;

                button {
                    display: grid;
                    place-content: center;
                    background: transparent;
                    border: none;
                    font-size: 2.5rem;
                }

                span {
                    font-size: 1.6rem;
                }
            }

            button {
                width: 100%;
            }
        }

        &.pc-slider::after, &.pc-slider::before {
            position: absolute;
            content: "";
            width: 10rem;
            height: 100%;
            background: #000a0f7e;
        }

        &.pc-slider::before {
            right: 0;
            z-index: 1;
        }

        @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
            >.slide .preco {
                font-size: 2rem;
            }
        }
    }

    .navigation {
        position: relative;
    }

    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        width: 3rem;
        height: 3rem;
        fill: #fff;
        cursor: pointer;
        z-index: 2;
    }

    .arrow--left {
        left: 5px;
    }

    .arrow--right {
        left: auto;
        right: 5px;
    }

    .arrow--disabled {
        fill: rgba(255, 255, 255, 0.5);
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        padding: 0;
    }
`;