import { styled } from "styled-components";

export const Container = styled.button`
    background: ${({theme, $isActive}) => $isActive ? theme.COLORS.BLUE_100 : "transparent"};
    color: ${({theme, $isActive}) => $isActive ? theme.COLORS.GRAY_500 : theme.COLORS.BLUE_100};
    padding: 2px 5px;
    border: 1px solid ${({theme}) => theme.COLORS.BLUE_100};
    border-radius: 1rem;
`;