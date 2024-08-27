import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: fit-content;
    background: ${({ theme }) => theme.COLORS.LIGHT.LIGHT600};
    padding: 1rem 1.6rem;
    border-radius: 0.8rem;
    
    & * {
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT100};
    }
    > p {
        font-size: 1.6rem;
    }

    > button {
        display: grid;
        place-content: center;
        background: none;
        border: none;
    }
`;