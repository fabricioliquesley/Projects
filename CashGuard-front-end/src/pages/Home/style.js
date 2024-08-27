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

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.666666rem;

    > .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        background: ${({ theme }) => theme.COLORS.GRAY_500};
        margin: 0px -1.666666rem;
        padding: 1.666666rem;
        border-radius: 0 0 2rem 2rem;

        .accountBalance {
            text-align: center;

            span {
                color: ${({ theme }) => theme.COLORS.GRAY_200};
            }

            h3 {
                color: ${({ theme }) => theme.COLORS.BLUE_100};
                font-size: 2rem;
            }
        }

        .transactionsBalances{
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;

            @media (max-width: ${DEVICE_BREAKPOINT.XS}) {
                flex-direction: column;
                gap: 0.7rem;
            }
        }
    }

    > h3 {
        display: flex;
        align-items: center;
        gap: 5px;
        color: ${({ theme }) => theme.COLORS.GRAY_200};

        > svg {
            font-size: 1.5rem;
        }
    }

    > .transactions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        flex: 1;
        height: 100vh;
        overflow-y: auto;
        
        > .card {
            width: 100%;
            max-width: 51.875rem;
            margin: 0 auto;
            border-radius: 2rem;
        }

        > h3 {
            width: 100%;
            max-width: 51.875rem;
            margin: 0 auto;
        }

        > .transactions {
            width: 100%;
            max-width: 51.875rem;
            margin: 0 auto;
        }
    }
`;