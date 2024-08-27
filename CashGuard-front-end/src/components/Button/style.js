import { styled } from "styled-components";

export const Container = styled.button`
    width: 100%;
    background: ${({theme}) => theme.COLORS.BLUE_100};
    color: ${({theme}) => theme.COLORS.GRAY_500};
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
`;