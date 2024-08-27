import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    max-width: 40rem;
    padding: 0 3rem;
    /* margin-bottom: 10rem; */

    > h2 {
        display: none;
    }

    fieldset {
        border: none;

        > label {
            display: block;
            color: ${({theme}) => theme.COLORS.LIGHT.LIGHT400};
            font-size: 1.1rem;
            margin-bottom: 0.8rem;
        }
    }

    > a {
        color: ${({theme}) => theme.COLORS.LIGHT.LIGHT100};
        text-align: center;
        font-size: 1.1rem;
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        background-color: ${({theme}) => theme.COLORS.DARK.DARK700};
        padding: 6.4rem;
        border-radius: 1.6rem;

        > h2 {
            display: block;
            text-align: center;
            color: ${({theme}) => theme.COLORS.LIGHT.LIGHT100};
        }
    }
`;