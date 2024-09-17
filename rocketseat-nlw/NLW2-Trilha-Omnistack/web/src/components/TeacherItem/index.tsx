import "./styles.css";

import whatsappIcon from "../../assets/icons/whatsapp.svg";
import { api } from "../../services/api";

export interface TeacherItemProps {
  id: string;
  subject: string;
  cost: number;
  user_id: string;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

export const TeacherItem = (data: TeacherItemProps) => {
  async function handleContactTeacher() {
    await api.post("/connections", {
      user_id: data.user_id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={data.avatar} alt="" />
        <div>
          <strong>{data.name}</strong>
          <span>{data.subject}</span>
        </div>
      </header>
      <p>{data.bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>
            {data.cost.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </p>
        <a
          href={`https://wa.me/${data.whatsapp}`}
          onClick={handleContactTeacher}
        >
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};
