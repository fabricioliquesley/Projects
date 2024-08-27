import { Container, OrdersContainer, StatusOrder } from "./style";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Menu } from "../../components/Menu";

import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function OrdersHistory() {
  const [statusMenu, setStatusMenu] = useState("close");

  const [width, setWidth] = useState(window.document.defaultView.innerWidth);

  window.addEventListener("resize", () => {
    setWidth(window.document.defaultView.innerWidth);
  })

  const orderItem = JSON.parse(localStorage.getItem("@foodExplorer:orderItems")) || 0;

  function toggleMenu() {
    if (statusMenu == "open") {
      return setStatusMenu("close");
    }

    return setStatusMenu("open");
  }

  const user = {
    accountType: "common"
  }

  const [history, setHistory] = useState([]);

  async function fetchOrderHistory() {
    const { data } = await api.get("/orders");

    data.map((order) => {
      order.created_at = order.created_at.split(" ");
      order.created_at[0] = order.created_at[0].split("-");
      order.created_at[1] = order.created_at[1].split(":");
    })

    setHistory(data);
  }

  useEffect(() => {
    fetchOrderHistory()
  }, [])

  return (
    <Container>
      <Header
        menuStatus={statusMenu}
        variant={user.accountType}
        orderAmount={orderItem.length}
        onClick={toggleMenu}
      />
      <main>
        {
          width < 1024 &&
          <Menu status={statusMenu} variant={user.accountType} />
        }
        <h2 className="poppins-medium">Pedidos</h2>
        <OrdersContainer>
          {
            width < 1024 ?
              <>
                {
                  history.map((card, index) => (
                    <div
                      className="orderCard"
                      key={index}
                    >
                      <div>
                        <p>{card.code}</p>
                        <StatusOrder $orderstatus={card.status}>
                          <span>
                            {card.status}
                          </span>
                        </StatusOrder>
                        <p>
                          {
                            card.created_at[0][2]
                            + "/" +
                            card.created_at[0][1]
                            + " às " +
                            (card.created_at[1][0] - 3)
                            + "h" +
                            card.created_at[1][1]
                          }
                        </p>
                      </div>
                      <p>
                        {card.details}
                      </p>
                    </div>
                  ))
                }
              </>
              :
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Código</th>
                    <th>Detalhes do pedido</th>
                    <th>Data e hora</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    history.map((card, index) => (
                      <tr
                        key={index}
                      >
                        <StatusOrder $orderstatus={card.status}>
                          <span>
                            {card.status}
                          </span>
                        </StatusOrder>
                        <td>{card.code}</td>
                        <td>
                          {card.details}
                        </td>
                        <td>
                          {
                            card.created_at[0][2]
                            + "/" +
                            card.created_at[0][1]
                            + " às " +
                            (card.created_at[1][0] - 3)
                            + "h" +
                            card.created_at[1][1]
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          }
        </OrdersContainer>
      </main>
      <Footer />
    </Container>
  )
}