import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
    display: grid;
    place-content: center;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.COLORS.BLUE_100};
    padding: 5px;
    border-radius: 50%;

    > svg {
        color: ${({ theme }) => theme.COLORS.BLUE_100};
        font-size: 1.6rem;
    }
`;