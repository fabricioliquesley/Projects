import { styled } from "styled-components";

export const Container = styled.div`
    /* > .payment { */
        width: 100%;
        margin: 3.2rem auto;

        .paymentMethod {
            display: flex;
            align-items: center;
            border: 1px solid ${({ theme }) => theme.COLORS.LIGHT.LIGHT600};
            border-bottom: none;
            border-radius: 0.8rem 0.8rem 0 0;
            overflow: hidden;

            label {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.8rem;
                width: 100%;
                padding: 2.4rem 3.6rem;
                cursor: pointer;
            }

            .pix {
                background-color: ${({ $method, theme }) => $method == "pix" ? theme.COLORS.DARK.DARK800 : "transparent"};
            }

            .credit {
                background-color: ${({ $method, theme }) => $method == "credit" ? theme.COLORS.DARK.DARK800 : "transparent"};
            }

            input {
                display: none;
            }
        }

        .selectedMethod {
            display: ${({ $method }) => $method == "pix" && "flex"};
            align-items: center;
            justify-content: center;

            width: 100%;
            padding: ${({ $method }) => $method == "pix" ? "3rem 0" : "3.7rem 2.7rem"};
            border: 1px solid ${({ theme }) => theme.COLORS.LIGHT.LIGHT600};
            border-radius: 0 0 0.8rem 0.8rem;

            form {
                display: grid;
                gap: 3.7rem;
                div {
                    display: flex;
                    flex-direction: column;

                    label {
                        font-size: 1.6rem;
                        font-weight: 400;
                        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT400};
                    }

                    input {
                        width: 100%;
                        background: transparent;
                        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT500};
                        padding: 1.2rem 1.4rem;
                        border: 1px solid ${({ theme }) => theme.COLORS.LIGHT.LIGHT100};
                        border-radius: 0.5rem;
                    }
                }

                .otherInfos {
                    flex-direction: row;
                    gap: 1.7rem;
                }

                button {
                    width: 100%;
                }
            }
        }
    /* } */
`;