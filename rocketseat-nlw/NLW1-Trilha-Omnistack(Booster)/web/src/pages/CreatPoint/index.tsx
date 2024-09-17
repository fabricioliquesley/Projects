import "./CreatePoint.css";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import { FiArrowLeft } from "react-icons/fi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/api";
import axios from "axios";
import { LeafletMouseEvent } from "leaflet";
import { Dropzone } from "../../components/dropzone";
import { Dialog } from "../../components/dialog";

type Uf = {
  id: string;
  sigla: string;
  nome: string;
};

type City = {
  id: string;
  nome: string;
};

type Item = {
  id: string;
  image_url: string;
  title: string;
};

export function CreatePoint() {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  function handleSelectUf(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(e.target.value);
  }

  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(e.target.value);
  }

  function handleMapClick(e: LeafletMouseEvent) {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  function MapEventsManager() {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  }

  function handleSelectItem(id: string) {
    if (selectedItems.includes(id)) {
      return setSelectedItems(selectedItems.filter((item) => item !== id));
    }

    setSelectedItems([...selectedItems, id]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { name, email, whatsapp: phone } = formData;
    const [latitude, longitude] = selectedPosition;
    const uf = selectedUf;
    const city = selectedCity;
    const items = selectedItems;

    const dataToSend = new FormData();

    dataToSend.append("name", name);
    dataToSend.append("email", email);
    dataToSend.append("phone", phone);
    dataToSend.append("uf", uf);
    dataToSend.append("city", city);
    dataToSend.append("latitude", String(latitude));
    dataToSend.append("longitude", String(longitude));
    dataToSend.append("items", items.join(","));

    if (selectedFile) {
      dataToSend.append("image", selectedFile);
    }

    await api.post("/points", dataToSend);

    setDialogStatus(true);
    document.body.classList.add("no-scroll");
  }

  const navigate = useNavigate();

  function handleCloseDialog() {
    setDialogStatus(false);
    document.body.classList.remove("no-scroll");
    navigate("/");
  }

  // get ufs
  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => setUfs(response.data));
  }, []);

  // get cities
  useEffect(() => {
    if (selectedUf === "") return;

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => setCities(response.data));
  }, [selectedUf]);

  // get items
  useEffect(() => {
    api.get("/items").then((response) => setItems(response.data));
  }, []);

  return (
    <div id="page-create-point">
      <Dialog isOpen={dialogStatus} onClick={handleCloseDialog} />
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to={"/"}>
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br />
          ponto de coleta
        </h1>
        <Dropzone onFileUploaded={setSelectedFile} />
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione um endereço no mapa</span>
          </legend>
          <MapContainer
            center={[-19.808256, -44.023808]}
            zoom={15}
            style={{ zIndex: "1" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEventsManager />
            <Marker position={selectedPosition} />
          </MapContainer>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" onChange={handleSelectUf}>
                <option value="">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option value={uf.sigla} key={uf.id}>
                    {uf.nome} {`(${uf.sigla})`}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" onChange={handleSelectCity}>
                <option value="0">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option value={city.nome} key={city.id}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}
