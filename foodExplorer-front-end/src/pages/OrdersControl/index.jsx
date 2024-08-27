import { Container, OrdersContainer, StatusOrder, Options } from "./style";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Menu } from "../../components/Menu";
import { Select } from "../../components/Select";
import { IoIosArrowDown } from "react-icons/io";

import { useState, useEffect } from "react";
import { useAuth } from "../../hook/auth";

import { api } from "../../services/api";

export function OrdersControl() {
  const [statusMenu, setStatusMenu] = useState("close");

  const [width, setWidth] = useState(window.document.defaultView.innerWidth);

  window.addEventListener("resize", () => {
    setWidth(window.document.defaultView.innerWidth);
  })

  function toggleMenu() {
    if (statusMenu == "open") {
      return setStatusMenu("close");
    }

    return setStatusMenu("open");
  }

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  async function fetchOrder() {
    const { data } = await api.get("/orders");

    data.map((order) => {
      order.created_at = order.created_at.split(" ");
      order.created_at[0] = order.created_at[0].split("-");
      order.created_at[1] = order.created_at[1].split(":");
    })

    setOrders(data);
  }

  const statusOptions = [
    "Pendente",
    "Preparando",
    "Entregue"
  ]

  const [isChange, setIsChange] = useState(false);

  const [selectStatus, setSelectStatus] = useState("close");

  function toggleSelectStatus(target) {
    let container;

    if (target.tagName == "LI") {
      container = target.parentNode.parentNode;
    } else {
      container = target.parentNode;
    }

    const options = container.querySelector("ul");

    if (selectStatus == "open") {
      options.style.display = "none";
      return setSelectStatus("close");
    }

    options.style.display = "flex";

    return setSelectStatus("open");
  }

  async function selectOption(value, id, currentStatus) {
    try {
      if (value == currentStatus) {
        return;
      }
      await api.patch(`/orders/${id}`, { status: value });

      setIsChange(true);
    }
    catch {
      alert("Não foi possível atualizar o status do pedido");
    }
  }

  useEffect(() => {
    fetchOrder();
    setIsChange(false);
  }, [isChange])

  return (
    <Container>
      <Header
        menuStatus={statusMenu}
        variant={user.accountType}
        orderAmount={5}
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
                  orders.map((card, index) => (
                    <div
                      className="orderCard"
                      key={index}
                    >
                      <div>
                        <p>{card.code}</p>
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
                      <Select
                        selectStatus={selectStatus}
                        action={(e) => toggleSelectStatus(e.currentTarget)}
                      >
                        <StatusOrder
                          className="select"
                          $orderstatus={card.status}
                        >
                          <p>{card.status}</p>
                          <IoIosArrowDown size={24} />
                        </StatusOrder>
                        <Options>
                          {
                            statusOptions.map((statusOption, index) => (
                              <li
                                key={index}
                                data-value={statusOption}
                                onClick={(e) => {
                                  selectOption(e.target.dataset.value, card.id, card.status);
                                  toggleSelectStatus(e.target);
                                }}
                              >
                                {statusOption}
                              </li>
                            ))
                          }
                        </Options>
                      </Select>
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
                    orders.map((card, index) => (
                      <tr
                        key={index}
                      >
                        <StatusOrder $orderstatus={card.status}>
                          <Select
                            selectStatus={selectStatus}
                            action={(e) => {
                              toggleSelectStatus(e.currentTarget);
                              e.stopPropagation();
                            }}
                          >
                            <div
                              className="select"
                            >
                              <p>{card.status}</p>
                              <IoIosArrowDown size={24} />
                            </div>
                            <Options
                              $selectStatus={selectStatus}
                            >
                              {
                                statusOptions.map((statusOption, index) => (
                                  <li
                                    key={index}
                                    data-value={statusOption}
                                    onClick={(e) => {
                                      selectOption(e.target.dataset.value, card.id, card.status);
                                      toggleSelectStatus(e.target);
                                    }}
                                  >
                                    {statusOption}
                                  </li>
                                ))
                              }
                            </Options>
                          </Select>
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