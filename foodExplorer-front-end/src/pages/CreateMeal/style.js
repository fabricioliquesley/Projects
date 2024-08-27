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
    }
`;

export const Content = styled.div`
    display: grid;
    gap: 2.4rem;
    padding: 3.2rem;

    > a {
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT300};
        line-height: 140%;
    }

    h2 {
        font-size: 2.6rem;
        font-weight: 500;
        color: ${({ theme }) => theme.COLORS.LIGHT.LIGHT100};
    }

    @media (min-width: ${DEVICE_BREAKPOINT.LG}) {
        grid-template-areas: 
            "link link link"
            "title title title"
            "imageInput nameInput category"
            "ingredientsTag ingredientsTag inputPreco"
            "textArea textArea textArea"
            "empty empty saveButton";
        padding: 3.2rem 12.3rem;

        .link {
            grid-area: link;
            font-size: 2.4rem;
        }

        .title {
            grid-area: title;
            font-size: 3.2rem;
        }

        .imageInput {
            grid-area: imageInput;
        }

        .inputName {
            grid-area: nameInput;
        }

        .inputCategory {
            grid-area: category;
        }

        .ingredientsTag {
            grid-area: ingredientsTag;
        }

        .inputPreco {
            grid-area: inputPreco;
        }

        .textArea {
            grid-area: textArea;
        }

        .saveButton {
            grid-area: saveButton;
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