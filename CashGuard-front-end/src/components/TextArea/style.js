import { styled } from "styled-components";

export const Container = styled.textarea`
    width: 100%;
    height: 12.5rem;
    background: ${({theme}) => theme.COLORS.GRAY_400};
    color: ${({theme}) => theme.COLORS.BLUE_100};
    border: 1px solid ${({theme}) => theme.COLORS.BLUE_100};
    border-radius: 1rem;
    padding: 0.7rem;
    resize: none;
    outline: none;

    &::placeholder {
        color: ${({theme}) => theme.COLORS.BLUE_100};
    }
`;