import { styled } from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 2.75rem;
    background: ${({theme}) => theme.COLORS.GRAY_400};
    color: ${({theme}) => theme.COLORS.BLUE_100};
    border: 1px solid ${({theme}) => theme.COLORS.BLUE_100};
    border-radius: 1rem;
    
    > div {
        position: absolute;
        width: 100%;
        height: 2.75rem;
        overflow: hidden;

        &:hover {
            overflow: ${({$editable}) => $editable ? "hidden" : "initial"};
        }
    }
`;

export const Selected = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem;
    cursor: pointer;
    
    > div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    > svg {
        font-size: 1.2rem;
    }
`;