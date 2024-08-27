import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    > svg {
        font-size: 2rem;
    }

    > div {
        span {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }

        p {
            font-size: 1.5rem;
            font-weight: 700;
            color: ${({theme, $type}) => $type === "expenses" ? theme.COLORS.RED_100 : theme.COLORS.GREEN_100};
        }
    }
`;