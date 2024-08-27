import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    background: ${({theme}) => theme.COLORS.GRAY_400};
    padding: 0.7rem;
    border: 1px solid ${({theme}) => theme.COLORS.BLUE_100};
    border-radius: 1rem;
    color: ${({theme}) => theme.COLORS.BLUE_100};

    > svg {
        font-size: 1.2rem;
    }

    > input {
        width: 100%;
        background-color: transparent;
        color: ${({theme}) => theme.COLORS.BLUE_100};
        border: none;

        &::placeholder {
            color: ${({theme}) => theme.COLORS.BLUE_100};
        }
    }
`;
