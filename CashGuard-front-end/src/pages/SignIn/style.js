import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../style/deviceBreakPoint";

export const Container = styled.main`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100vh;
    padding: 1.666666rem;
    overflow: hidden;

    .sprite1 {
        top: -3rem;
        right: -1rem;
        transform: rotate(30deg);
    }

    .sprite2 {
        left: -3rem;
        transform: rotate(-30deg);
    }

    .sprite3 {
        bottom: -4.2rem;
        right: 4.3rem;
        transform: rotate(-30deg);
    }
`;

export const Message = styled.section`
    > h2 {
        color: ${({ theme }) => theme.COLORS.BLUE_100};
        text-align: center;
    }

    > q {
        display: block;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
        text-align: center;
        margin-top: 1rem;
    }

    @media (min-width: ${DEVICE_BREAKPOINT.SM}) {
        width: 100%;
        max-width: 28.125rem;
        margin: 0 auto;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    > a {
        text-align: center;
        color: ${({ theme }) => theme.COLORS.BLUE_100};
    }

    @media (min-width: ${DEVICE_BREAKPOINT.SM}) {
        width: 100%;
        max-width: 28.125rem;
        margin: 0 auto;
    }
`;

export const BgEffect = styled.img`
    width: 11rem;
    position: absolute;
    z-index: -1;
`;