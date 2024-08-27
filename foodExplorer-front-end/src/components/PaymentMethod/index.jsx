import { Container } from "./style";
import { Button } from "../../components/Button";

import qrCode from "../../assets/qr-code.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";

export function PaymentMethod({ orderDetails }) {
    const [method, setMethod] = useState("pix");

    const [cardNumber, setCardNumber] = useState("");
    const [validity, setValidity] = useState("");
    const [codeCvc, setCodeCvc] = useState("");

    const navigate = useNavigate();

    async function finalizePayment() {
        if (!cardNumber || !validity || !codeCvc) {
            return alert("Preencha os dados");
        }

        if (orderDetails.length == 0){
            return alert("Acrescente itens no pedido");
        }

        try {
            await api.post("/orders", { orderDetails });

            navigate("/orders/history");

            localStorage.removeItem("@foodExplorer:orderItems");
        } catch (error) {
            alert("Não foi possível finalizar o pedido");
        }

    }

    return (
        <Container className="payment" $method={method}>
            <div className="paymentMethod">
                <label htmlFor="pix" className="pix">
                    PIX
                </label>
                <label htmlFor="credit" className="credit">
                    Crédito
                </label>
                <input
                    type="radio"
                    name="payment-Method"
                    id="pix"
                    defaultChecked
                    onClick={() => setMethod("pix")}
                />
                <input
                    type="radio"
                    name="payment-Method"
                    id="credit"
                    onClick={() => setMethod("credit")}
                />
            </div>
            <div className="selectedMethod">
                {
                    method == "pix" ?
                        <img src={qrCode} alt="" />
                        :
                        <form>
                            <div>
                                <label htmlFor="cardNumber">Número do cartão</label>
                                <input
                                    id="cardNumber"
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </div>
                            <div className="otherInfos">
                                <div>
                                    <label htmlFor="validity">Validade</label>
                                    <input
                                        id="validity"
                                        type="text"
                                        placeholder="04/25"
                                        onChange={(e) => setValidity(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cvc">CVC</label>
                                    <input
                                        id="cvc"
                                        type="number"
                                        placeholder="000"
                                        onChange={(e) => setCodeCvc(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button
                                title={"Finalizar pagamento"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    finalizePayment()
                                }}
                            />
                        </form>
                }
            </div>
        </Container>
    )
}