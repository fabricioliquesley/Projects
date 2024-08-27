import { styled } from "styled-components";

export const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rem;
    width: 100;
    background: ${({theme, $variant}) =>  $variant ? theme.COLORS.TINTS.TOMATO400 : theme.COLORS.TINTS.TOMATO100};
    opacity: ${({$variant}) => $variant ? "0.8" : "1"};
    color: ${({theme}) => theme.COLORS.LIGHT.LIGHT100};
    padding: 1.2rem 3.2rem;
    border: none;
    border-radius: 0.5rem;
`;