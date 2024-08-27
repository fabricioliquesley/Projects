import { styled } from "styled-components";

export const Container = styled.menu`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    height: 100%;
    background: ${({theme}) => theme.COLORS.DARK.DARK400};
    transform: ${({$status}) => $status == "open" ? "translateX(0%)" : "translateX(-100%)"};
    transition: .4s;
    padding: 2rem;
    z-index: 3;

    > .buttons {
        display: flex;
        flex-direction: column;

        button, a {
            text-align: start;
            background: transparent;
            color: ${({theme}) => theme.COLORS.LIGHT.LIGHT300};
            font-size: 2.4rem;
            font-weight: 300;
            padding: 1rem;
            border: none;
            border-bottom: 1px solid ${({theme}) => theme.COLORS.DARK.DARK1000};
        }
    }
    
`;