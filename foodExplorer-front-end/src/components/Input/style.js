import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1.4rem;
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.DARK.DARK900};
    padding: 1rem 1.4rem;
    border-radius: 0.8rem;
    
    > input {
        background: transparent;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT500};
        border: none;
        width: 100%;
        font-size: 1.2rem;

        > &::placeholder {
            color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT500};
        } 
    }


    > svg {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT500};
    }
`;