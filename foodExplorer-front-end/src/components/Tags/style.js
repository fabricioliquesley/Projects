import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;

    > label {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT400};
        line-height: 100%;
    }

    > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1.6rem;
        width: 100%;
        background: ${({ theme }) => theme.COLORS.DARK.DARK800};
        padding: .4rem .8rem;
        border-radius: 0.8rem;

        .tags {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.6rem;
        }

        .addTag {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 1rem 1.6rem;
            border: 2px dashed ${({ theme }) => theme.COLORS.LIGHT.LIGHT500};
            border-radius: 0.8rem;

            & * {
                color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT500};
            }

            > input {
                width: 7rem;
                background: none;
                border: none;
            }

            > button {
                display: grid;
                place-content: center;
                background: none;
                border: none;
            }
        }
    }
`;