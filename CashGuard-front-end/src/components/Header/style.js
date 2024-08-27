import { styled } from "styled-components";

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h1 {
        color: ${({ theme }) => theme.COLORS.GRAY_500};
    }
`;