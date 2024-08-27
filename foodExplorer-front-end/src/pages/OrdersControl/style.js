import { styled } from "styled-components";
import { DEVICE_BREAKPOINT } from "../../styles/deviceBreakPoint";

export const Container = styled.div`
	position: relative;
	display: grid;
	grid-template-rows: max-content 1fr max-content;
	width: 100%;
	height: 100vh;
	overflow: hidden;

	> main {
		overflow: ${({ $statusMenu }) => $statusMenu == "open" ? "hidden" : "auto"};

		h2 {
			color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
			font-size: 3.2rem;
			line-height: 140%;
			margin: 5.6rem 2rem 1.7rem;
		}


		@media (min-width: ${DEVICE_BREAKPOINT.LG}) {
			h2 {
				margin: 5.6rem 12.3rem 1.7rem;
			}
		}
	}
`;

export const OrdersContainer = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.7rem;
	padding: 0 2rem 3rem;

	> .orderCard {
		color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT400};
		font-size: 1.2rem;
		line-height: 160%;
		padding: 2rem;
		border: 2px solid ${({ theme }) => theme.COLORS.DARK.DARK1000};
		border-radius: .8rem;

		div {
			display: flex;
			flex-wrap: wrap;
			gap: 1.5rem;
		}

		> p {
			margin-top: 1.6rem;
		}
	}

	> table {
		margin: 0 12.3rem 3rem;
		border: 2px solid ${({ theme }) => theme.COLORS.DARK.DARK1000};
		border-radius: .8rem;
		border-spacing: 0;

		tr {
			th {
				text-align: start;
			}

			th, td {
				color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
				font-size: 1.4rem;
				font-weight: 700;
				line-height: 160%;
				padding: 2rem 2.4rem;
				border-bottom: 2px solid ${({ theme }) => theme.COLORS.DARK.DARK1000};
			}

			th + th, td + td {
				border-left: 2px solid ${({ theme }) => theme.COLORS.DARK.DARK1000};
			}
		}

		tbody {
			tr {
				&:last-child {
					td {
						border-bottom: 0;
					}
				}
			}
		}

		.orderCard {
			display: flex;
			align-items: center;
			padding: 0;

			p {
				padding: 2rem 2.4rem;
				flex-grow: 1;
				margin: 0;

				&:nth-child(3) {
					flex-grow: 0;
					background: red;
				}
			}
		}

		.orderCard + .orderCard{
			border-top: 0;
		}

		.orderCard:last-child {
			border-radius: 0 0 .8rem .8rem;
		}
	}

	@media (min-width: ${DEVICE_BREAKPOINT.LG}) {
		padding: 0;
	}
`;

export const StatusOrder = styled.td`
	p {
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

export const Options = styled.ul`
	display: none;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    background: ${({ theme }) => theme.COLORS.DARK.DARK900};
    color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT400};
    font-size: 1.4rem;
    padding: 1.6rem;
    border-radius: 0.5rem;
    list-style: none;
    cursor: pointer;

	&.open {
		display: flex;
	}

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        position: absolute;
        top: 10rem;
        z-index: 1;
    }
`;