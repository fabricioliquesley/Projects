import { styled } from "styled-components";

export const Container = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    border: none;

    > label {
        font-size: 1.6rem;
        color: ${({theme}) => theme.COLORS.LIGHT.LIGHT400};
        line-height: 100%;
    }

    > div {
        position: relative;
        display: flex;
        align-items: center;
        gap: .8rem;
        width: 100%;
        background: ${({theme}) => theme.COLORS.DARK.DARK800};
        padding: 1.2rem 1.4rem;
        border-radius: 0.8rem;

        svg {
            color: ${({theme}) => theme.COLORS.LIGHT.LIGHT100};
        }

        input {
            width: 100%;
            background: transparent;
            font-size: 1.6rem;
            color: ${({theme}) => theme.COLORS.LIGHT.LIGHT500};
            line-height: 100%;
            border: none;
            opacity: ${({$variant}) => $variant == "file" ? "0" : "1"};
        }

        p {
            position: absolute;
            left: 4.8rem;
            font-size: 1.4rem;
            color: ${({theme}) => theme.COLORS.LIGHT.LIGHT100};
            line-height: 2.4rem;
        }
    }
`;