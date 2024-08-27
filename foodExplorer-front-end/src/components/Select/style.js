import { styled } from "styled-components";

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;

    > label {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT400};
        line-height: 100%;
    }

    > .select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${({ theme }) => theme.COLORS.DARK.DARK900};
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT400};
        font-size: 1.4rem;
        padding: 1.6rem;
        border-radius: 0.5rem;
        cursor: pointer;

        svg {
            transform: ${({ $selectStatus }) => $selectStatus == "open" ? "rotate(180deg)" : "rotate(0deg)"};
            transition: .4s;
        }
    }

    .statusOrder {
		display: flex;
		align-items: center;
		gap: .8rem;

		&::before {
			content: "";
			width: .8rem;
			height: .8rem;
			background: ${({ theme, $orderstatus }) => $orderstatus == "Pendente" ? theme.COLORS.TINTS.TOMATO300 : $orderstatus == "Preparando" ? theme.COLORS.TINTS.CARROT100 : theme.COLORS.TINTS.MINT100};
			border-radius: 50%;
		}
	}
`;