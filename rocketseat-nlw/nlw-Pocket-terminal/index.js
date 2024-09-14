import { select, input, checkbox } from "@inquirer/prompts"
import fs from "node:fs/promises"

let goals;

let message = "Bem vindo ao app de controle de metas";

let loadGoals = async () => {};
let saveGoals = async () => {};
let showMessage = () => {};
let registerGoal = async () => {};
let listGoals = async () => {};
let realizedGoals = async () => {};
let pendingGoals = async () => {};
let removeGoal = async () => {};

const main = async () => {
  await loadGoals();

  while (true) {
    showMessage();

    const option = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta", value: "register"
        },
        {
          name: "Ver metas", value: "list"
        },
        {
          name: "Ver metas realizadas", value: "realized"
        },
        {
          name: "Ver pendentes", value: "pending"
        },
        {
          name: "Remover meta", value: "remove"
        },
        {
          name: "Sair", value: "exit"
        },
      ]
    })

    switch (option) {
      case "register":
        await registerGoal()
        break;
      case "list":
        await listGoals()
        break;
      case "realized":
        await realizedGoals()
        break;
      case "pending":
        await pendingGoals()
        break;
      case "remove":
        await removeGoal()
        break;
      case "exit":
        console.log("Até a próxima ^_~");
        return
    }
  }
}

loadGoals = async () => {
  try {
    const data = await fs.readFile("goals.json", "utf-8");

    return goals = JSON.parse(data);
  } catch (error) {
    return goals = [];
  }
}

saveGoals = async () => {
  return await fs.writeFile("goals.json", JSON.stringify(goals));
}

showMessage = () => {
  console.clear();

  if(message != "") {
    console.log(message +"\n");
    message = "";
  }
}

registerGoal = async () => {
  const goal = await input({ message: "Digite a meta:" });

  if(!goal) {
    return message = "A meta não pode ser vazia.";
  }

  goals.push({ value: goal, checked: false });

  message = "Meta cadastrada com sucesso!";
  return await saveGoals();
}

listGoals = async () => {
  if (goals.length == 0) {
    return message = "Você não possui metas cadastradas."
  }

  const responses = await checkbox({
    message: "Use as <setas> para mudar de meta, o <espaço> para marcar ou desmarcar e o <Enter> para finalizar essa etapa",
    choices: [...goals],
    instructions: false
  });

  goals.forEach(goal => goal.checked = false);

  if (responses.length == 0) {
    return message = "Nenhuma meta foi selecionada!";
  }

  responses.forEach(response => {
    const goal = goals.find(_goal => {
      return _goal.value == response;
    })
    
    goal.checked = true;
  })

  message = "Meta(s) concluída(s)";
  return await saveGoals();
}

realizedGoals = async () => {
  if (goals.length == 0) {
    return message = "Você não possui metas cadastradas."
  }

  const realizedGoals = goals.filter(goal => goal.checked);

  if (realizedGoals.length == 0) {
    return message = "Nenhuma meta foi concluída!";
  }

  await select({
    message: `Metas Realizadas (${realizedGoals.length})`,
    choices: [...realizedGoals]
  })
}

pendingGoals = async () => {
  if (goals.length == 0) {
    return message = "Você não possui metas cadastradas."
  }
  
  const pendingGoals = goals.filter(goal => !goal.checked);

  if (pendingGoals.length == 0) {
    return message = "Todas as metas já foram concluídas! :)";
  }

  await select({
    message: `Metas Pendentes (${pendingGoals.length})`,
    choices: [...pendingGoals]
  })
}

removeGoal = async () => {
  const uncheckedGoals = goals.map(goal => {
    return {value: goal.value, checked: false};
  })

  const goalsToDelete = await checkbox({
    message: "Selecione item para deletar",
    choices: [...uncheckedGoals],
    instructions: false
  });

  if(goalsToDelete.length == 0) {
    return message = "Nenhuma meta foi selecionada.";
  }

  goalsToDelete.forEach(goalToDelete => {
    goals = goals.filter(goal => goal.value != goalToDelete)
  })

  message = "Meta(s) deletada(s)!";
  return await saveGoals();
}

main();