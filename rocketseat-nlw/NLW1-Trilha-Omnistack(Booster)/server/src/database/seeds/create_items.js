const { randomUUID } = require("node:crypto")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex("items").insert([
    { id: randomUUID(), title: "Lâmpadas", image_url: "lampada.svg" },
    { id: randomUUID(), title: "Pilhas e Baterias", image_url: "baterias.svg" },
    { id: randomUUID(), title: "Papeis e Papelão", image_url: "papeis-papelao.svg" },
    { id: randomUUID(), title: "Resíduos Eletrônicos", image_url: "eletronicos.svg" },
    { id: randomUUID(), title: "Resíduos Orgânicos", image_url: "organicos.svg" },
    { id: randomUUID(), title: "Óleo de Cozinha", image_url: "oleo.svg" },
  ]);
};
