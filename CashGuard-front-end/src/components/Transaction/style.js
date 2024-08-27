import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: ${({theme}) => theme.COLORS.GRAY_500};
    padding: 1.3rem;
    border-radius: 1rem;
    cursor: pointer;

    > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        svg {
            font-size: 2rem;
            color: ${({theme, $type}) => $type === "expenses" ? theme.COLORS.RED_100 : theme.COLORS.GREEN_100};
        }

        h5 {
            font-size: 1.2rem;
            color: ${({theme}) => theme.COLORS.BLUE_100};
        }

        p {
            color: ${({theme}) => theme.COLORS.GRAY_200};
        }
    }

    > p {
        font-size: 1.2rem;
        color: ${({theme, $type}) => $type === "expenses" ? theme.COLORS.RED_100 : theme.COLORS.GREEN_100};
        font-weight: 900;
    }
`;