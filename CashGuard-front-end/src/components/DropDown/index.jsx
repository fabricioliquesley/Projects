import { Container, Selected } from "./style";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoTrendingUpOutline, IoTrendingDownOutline, IoHome, IoWineSharp, IoAirplaneSharp, IoStorefrontOutline, IoFastFoodOutline, IoBarChartOutline, IoEllipsisHorizontalSharp, IoCheckmarkSharp, IoCloseOutline } from "react-icons/io5";
import { GiReceiveMoney, GiPresent, GiPartyPopper } from "react-icons/gi";

export function DropDown({ children, selected, editable, ...rest }) {
    function selectIcon() {
        switch (selected) {
            case "Despesa":
                return <IoTrendingDownOutline />
            case "Receita":
                return <IoTrendingUpOutline />
            case "Casa":
                return <IoHome />
            case "Bar":
                return <IoWineSharp />
            case "Viagem":
                return <IoAirplaneSharp />
            case "Compras":
                return <IoStorefrontOutline />
            case "Alimentação":
                return <IoFastFoodOutline />
            case "Diversao":
                return <GiPartyPopper />
            case "Investimentos":
                return <IoBarChartOutline />
            case "Salario":
                return <GiReceiveMoney />
            case "Presente":
                return <GiPresent />
            case "Não pago":
            case "Não recebido":
                return <IoCloseOutline />
            case "Pago":
            case "Recebido":
                return <IoCheckmarkSharp />
            default:
                return <IoEllipsisHorizontalSharp />
        }
    }

    return (
        <Container {...rest} $editable={editable}>
            <div>
                <Selected>
                    <div>
                        {selectIcon()}
                        <p>{selected}</p>
                    </div>
                    {
                        editable ? null : <MdOutlineKeyboardArrowDown />
                    }
                </Selected>
                {children}
            </div>
        </Container>
    )
}