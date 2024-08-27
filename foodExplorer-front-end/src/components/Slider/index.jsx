import { Container } from './style';
import { Button } from "../Button";
import { CiHeart } from "react-icons/ci";
import { PiPencilSimple } from "react-icons/pi";

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { api } from "../../services/api";

export function Slider({ title, data, variant }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    // mudanças
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(max-width: 320px)": {
        slides: {
          perView: 1.3,
          spacing: 16
        }
      },
      "(min-width: 321px)": {
        slides: {
          perView: 1.4,
          spacing: 16
        }
      },
      "(min-width: 420px)": {
        slides: {
          perView: 1.6,
          spacing: 16
        }
      },
      "((min-width: 426px) and (max-width: 600px))": {
        slides: {
          perView: 2,
          spacing: 16
        }
      },
      "((min-width: 600px) )": {
        slides: {
          perView: 2.5,
          spacing: 16
        }
      },
      "((min-width: 769px) and (max-width: 1179px))": {
        slides: {
          perView: 3.7,
          spacing: 16
        }
      },
      "(min-width: 1180px)": {
        slides: {
          perView: 4,
          spacing: 16
        }
      },
      "(min-width: 1200px)": {
        slides: {
          perView: 4.5,
          spacing: 16
        }
      },
    },
  })

  const [width, setWidth] = useState(window.document.defaultView.innerWidth);

  window.addEventListener("resize", () => {
    setWidth(window.document.defaultView.innerWidth);
  })

  const [orderItems, setOrderItems] = useState(JSON.parse(localStorage.getItem("@foodExplorer:orderItems")) ?? []);

  function fetchForOrderItem(name) {
    if (!orderItems) return [false, null];

    let result = false;
    let index;

    orderItems.map((orderItem, i) => {
      if (orderItem.name == name) {
        result = true;
        index = i;
      }
    })

    if (result) return [true, index];

    return [false, null];
  }

  function incrementItemAmount(target) {
    const mealCard = target.parentNode.parentNode;

    const mealName = mealCard.querySelector(".title").innerText;
    const mealImgPath = mealCard.querySelector("img").src;
    const [, mealPrice] = mealCard.querySelector(".price").innerText.split(" ");
    const mealAmount = mealCard.querySelector(".amount");

    const [thereIsThisItemInTheOrder, index] = fetchForOrderItem(mealName);

    if (!thereIsThisItemInTheOrder) {
      mealAmount.textContent++;

      setOrderItems(prev => [...prev, {
        name: mealName,
        img: mealImgPath,
        price: Number(mealPrice.replace(",", ".")),
        amount: Number(mealAmount.textContent),
      }])

      return;
    }

    mealAmount.textContent++;
    orderItems[index].amount = Number(mealAmount.textContent);

    return;
  }

  function decreaseItemQuantity(target) {
    const mealCard = target.parentNode.parentNode;

    const mealName = mealCard.querySelector(".title").innerText;
    const mealAmount = mealCard.querySelector(".amount");

    const [thereIsThisItemInTheOrder, index] = fetchForOrderItem(mealName);

    if (!thereIsThisItemInTheOrder) {
      return
    }

    if (orderItems[index].amount > 0) {
      mealAmount.textContent--;
      orderItems[index].amount = Number(mealAmount.textContent);

      if (orderItems[index].amount == 0) {
        setOrderItems(orderItems.filter(orderItem => orderItem.name != mealName));
      }
    }
  }

  function addItemToOrder() {
    return localStorage.setItem("@foodExplorer:orderItems", JSON.stringify(orderItems));
  }

  const navigate = useNavigate();

  function handleMealDetail(id) {
    return navigate(`/meal/${id}`);
  }

  async function favoriteMeal(target, meal_id) {
    const mealCard = target.parentNode.parentNode;
    const mealImg = mealCard.querySelector("img").src.split("/");
    const mealTitle = mealCard.querySelector(".title").textContent;
    const svg = mealCard.querySelector("svg");

    const { data } = await api.get("/favorites");

    let thisFavoriteExist = [];

    data.map(meal => {
      if (meal.meal_name == mealTitle) {
        thisFavoriteExist = [true, meal.id];
      } else {
        thisFavoriteExist = [false, null];
      }
    })

    svg.classList.toggle("favorite");

    if (thisFavoriteExist[0]) {
      return await api.delete(`/favorites/${thisFavoriteExist[1]}`);
    }

    await api.post("/favorites", {
      meal_name: mealTitle,
      image_path: mealImg[mealImg.length - 1],
      meal_id
    })
  }

  const [favorites, setFavorites] = useState([]);

  async function fetchFavorites() {
    const { data } = await api.get("/favorites");

    return setFavorites(data);
  }

  function thisIsAFavorite(name) {
    let result = false;

    favorites.map(meal => {
      if (meal.meal_name == name) {
        result = true;
      }
    })

    return result;
  }

  function navigateToEditMeal(id){
    navigate(`/edit/${id}`);
  }

  const user = {
    accountType: "admin"
  }

  useEffect(() => {
    fetchFavorites();
  }, [])

  return (
    <Container>
      <h3 className='poppins-medium'>{title}</h3>
      {
        width < 1024 ?
          <div ref={sliderRef} className="keen-slider slider">
            {
              data.map((meal, index) => (
                <div
                  className="keen-slider__slide slide"
                  key={index}
                  onClick={() => handleMealDetail(meal.id)}
                >
                  {
                    variant == "admin" ?
                      <button
                        className='favoriteBtn'
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToEditMeal(meal.id);
                        }}
                      >
                        <PiPencilSimple />
                      </button>
                      :
                      <button
                        className='favoriteBtn'
                        onClick={(e) => {
                          e.stopPropagation();
                          favoriteMeal(e.target, meal.id);
                        }}
                      >
                        <CiHeart className={thisIsAFavorite(meal.name) ? "favorite" : ""} />
                      </button>
                  }
                  <img src={meal.image_path} alt="Imagem ilustrativa do prato" />
                  <p className='title poppins-medium'>
                    {meal.name}
                  </p>
                  <span className='price roboto-regular'>
                    R$ {String(meal.price.toFixed(2)).replace(".", ",")}
                  </span>
                  {
                    variant !== "admin" &&
                    <>
                      <div
                        className='controls'
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => decreaseItemQuantity(e.target)}
                        >
                          -
                        </button>
                        <span className='roboto-regular amount'>
                          0
                        </span>
                        <button
                          onClick={(e) => incrementItemAmount(e.target)}
                        >
                          +
                        </button>
                      </div>
                      <Button
                        title={"incluir"}
                        onClick={e => {
                          addItemToOrder()
                          e.stopPropagation()
                        }}
                      />
                    </>
                  }
                </div>
              ))
            }
          </div>
          :
          <div className="navigation-wrapper navigation">
            <div ref={sliderRef} className="keen-slider slider pc-slider">
              {
                data.map((meal, index) => (
                  <div
                    className="keen-slider__slide slide"
                    key={index}
                    onClick={() => handleMealDetail(meal.id)}
                  >
                    {
                      variant == "admin" ?
                        <button 
                          className='favoriteBtn'
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToEditMeal(meal.id);
                          }}
                        >
                          <PiPencilSimple />
                        </button>
                        :
                        <button
                          className='favoriteBtn'
                          onClick={(e) => {
                            e.stopPropagation();
                            favoriteMeal(e.target, meal.id);
                          }}
                        >
                          <CiHeart className={thisIsAFavorite(meal.name) ? "favorite" : ""}/>
                        </button>
                    }
                    <img src={meal.image_path} alt="Imagem ilustrativa do prato" />
                    <p className='title poppins-medium'>
                      {meal.name}
                    </p>
                    <span className='price roboto-regular'>
                      R$ {String(meal.price.toFixed(2)).replace(".", ",")}
                    </span>
                    {
                      variant !== "admin" &&
                      <>
                        <div
                          className='controls'
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => decreaseItemQuantity(e.target)}
                          >
                            -
                          </button>
                          <span className='roboto-regular amount'>
                            0
                          </span>
                          <button
                            onClick={(e) => incrementItemAmount(e.target)}
                          >
                            +
                          </button>
                        </div>
                        <Button
                          title={"incluir"}
                          onClick={(e) => {
                            e.stopPropagation()
                            addItemToOrder()
                          }} />
                      </>
                    }
                  </div>
                ))
              }
            </div>
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                  }
                />
              </>
            )}
          </div>
      }
    </Container>
  )
}

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}