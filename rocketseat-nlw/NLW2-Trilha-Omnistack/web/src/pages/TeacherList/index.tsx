import "./styles.css";

import { Header } from "../../components/Header";
import { TeacherItem } from "../../components/TeacherItem";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { TeacherItemProps as Class } from "../../components/TeacherItem";

export const TeacherList = () => {
  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("1");
  const [time, setTime] = useState("06:00");

  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    if (subject === "") return;

    api
      .get("/classes", {
        params: {
          subject,
          week_day: weekDay,
          time,
        },
      })
      .then((response) => {
        setClasses(response.data);
      });
  }, [subject, weekDay, time]);

  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os proffys disponiveis.">
        <form id="search-teachers">
          <Select
            label="Matéria"
            id="subject"
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
          <Select
            label="Dia da semana"
            id="week_day"
            defaultValue={weekDay}
            onChange={(e) => setWeekDay(e.target.value)}
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
            label="Horário"
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </form>
      </Header>
      <main>
        {classes.length > 0 ? (
          classes.map((_class) => <TeacherItem key={_class.id} {..._class} />)
        ) : (
          <p className="alert">
            Nenhum professor encontrado <br />
            <i>(Utilize os filtros para aprofundar a sua busca)</i>
          </p>
        )}
      </main>
    </div>
  );
};
