import { Container, Content } from "./style";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Menu } from "../../components/Menu";
import { Button } from "../../components/Button";
import { PaymentMethod } from "../../components/PaymentMethod";

import { useState, useEffect } from "react";

export function Order() {
  const [statusMenu, setStatusMenu] = useState("close");
  const [width, setWidth] = useState(window.document.defaultView.innerWidth);
  const [step, setStep] = useState(1);
  let [total, setTotal] = useState(0);

  window.addEventListener("resize", () => {
    setWidth(window.document.defaultView.innerWidth);
  })

  function toggleMenu() {
    if (statusMenu == "open") {
      return setStatusMenu("close");
    }

    return setStatusMenu("open");
  }

  const [orderDetails, setOrderDetails] = useState();

  function finalizePayment(cards) {
    const orderItems = cards.querySelectorAll(".mealCard");

    let orderDetails = [];

    orderItems.forEach((orderItem) => {
      const title = orderItem.querySelector(".title").textContent;
      const detail = orderItem.querySelector(".details").textContent;

      orderDetails.push({
        amount: String(detail.split("x")[0]).trim(),
        name: title
      })
    })

    setOrderDetails(orderDetails);
  }

  const orderMeals = JSON.parse(localStorage.getItem("@foodExplorer:orderItems")) ?? [];

  useEffect(() => {
    let currentValue = total;

    orderMeals.map(orderMeal => {
      currentValue += orderMeal.price * orderMeal.amount;

      setTotal(currentValue);
    })

    const cards = document.querySelector(".cards");

    finalizePayment(cards)
  }, [])

  return (
    <Container $statusMenu={statusMenu}>
      <Header
        onClick={() => toggleMenu()}
        menuStatus={statusMenu}
        orderAmount={orderMeals.length}
      />
      <main>
        {
          width < 1024 &&
          <Menu status={statusMenu} />
        }
        <Content>
          <h2>
            {
              step == 1 ? "Meu pedido" : "Pagamento"
            }
          </h2>
          {
            step == 1 ?
              <div className="cards">
                {
                  orderMeals.map((orderMeal, index) => (
                    <div
                      key={index}
                      className="mealCard"
                    >
                      <img
                        src={orderMeal.img}
                        alt="Imagem ilustrativa do prato"
                      />
                      <div>
                        <p className="title">{orderMeal.name}</p>
                        <span className="details">
                          {orderMeal.amount} x
                          R$ {
                            String(orderMeal.price.toFixed(2))
                              .replace(".", ",")
                          }
                        </span>
                      </div>
                    </div>
                  ))
                }
                <p>
                  Total: R$ {
                    String(total.toFixed(2))
                      .replace(".", ",")
                  }
                </p>
                {
                  width < 1024 &&
                  <Button
                    title={"Avançar"}
                    onClick={() => {
                      setStep(2);
                    }}
                  />
                }
              </div>
              :
              <PaymentMethod orderDetails={orderDetails}/>
          }
          {
            width >= 1024 &&
            <>
              <h2>Pagamento</h2>
              <PaymentMethod orderDetails={orderDetails}/>
            </>
          }
        </Content>
      </main>
      <Footer />
    </Container>
  )
}