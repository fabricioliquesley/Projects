import { styled } from "styled-components";

export const Container = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    border: none;

    > label {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT400};
        line-height: 100%;
    }

    > textarea {
        width: 100%;
        height: 17rem;
        background: ${({ theme }) => theme.COLORS.DARK.DARK800};
        font-size: 1.6rem;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT500};
        line-height: 100%;
        padding: 1.4rem;
        border-radius: 0.8rem;
        border: none;
        resize: none;
        outline: none;
        overflow: hidden;
    }
`;