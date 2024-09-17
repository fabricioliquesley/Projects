import "./styles.css";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import warningIcon from "../../assets/icons/warning.svg";
import { Textarea } from "../../components/Textarea";
import { Select } from "../../components/Select";
import { FormEvent, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}

export const TeacherForm = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  function handleAddNewSchedule() {
    const maxDays = 7;

    const occupiedDays = new Set(
      scheduleItems.map((item) => parseInt(item.week_day, 10))
    );

    let nextDay = 0;

    while (occupiedDays.has(nextDay) && nextDay < maxDays) {
      nextDay++;
    }

    const defaultScheduleItem = {
      week_day: nextDay.toString(),
      from: "06:00",
      to: "14:00",
    };

    setScheduleItems([...scheduleItems, defaultScheduleItem]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value,
        };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }

  const navigate = useNavigate();

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    try {
      await api.post("/classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: parseInt(cost, 10),
        schedule: scheduleItems,
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro ao realizar cadastro!");
    }
  }

  return (
    <div id="page-teacher-form">
      <Header title="Que incrivel que você quer dar aulas.">
        <p className="headerDescription">
          O primeiro passo é preencher esse formulário de inscrição
        </p>
      </Header>
      <main>
        <form onSubmit={handleSubmitForm}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              id="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              id="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              id="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              id="subject"
              label="Matéria"
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: "Matemática", label: "Matemática" },
                { value: "História", label: "História" },
                { value: "Geografia", label: "História" },
                { value: "Artes", label: "Artes" },
                { value: "Química", label: "Química" },
                { value: "Biologia", label: "Biologia" },
                { value: "Física", label: "Física" },
                { value: "Português", label: "Português" },
              ]}
            />
            <Input
              id="cost"
              label="Custo hora/aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários dispóniveis
              <button
                type="button"
                disabled={scheduleItems.length == 7}
                onClick={handleAddNewSchedule}
              >
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div className="schedule-item" key={scheduleItem.week_day}>
                <Select
                  defaultValue={scheduleItem.week_day}
                  label="Dia da semana"
                  id="week_day"
                  onChange={(e) =>
                    setScheduleItemValue(index, "week_day", e.target.value)
                  }
                  options={[
                    { value: "0", label: "Domingo" },
                    { value: "1", label: "Segunda-feira" },
                    { value: "2", label: "Terça-feira" },
                    { value: "3", label: "Quarta-feira" },
                    { value: "4", label: "Quinta-feira" },
                    { value: "5", label: "Sexta-feira" },
                    { value: "6", label: "Sábado" },
                  ]}
                />
                <Input
                  id="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, "from", e.target.value)
                  }
                />
                <Input
                  id="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, "to", e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};
