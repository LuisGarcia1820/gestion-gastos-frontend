import { apiFetch } from "../utils/api.js";
import { getToken } from "../utils/auth.js";

//Referencias a los elementos del DOM
const form = document.getElementById("expenseForm");
const inputTitle = document.getElementById("expenseTitle");
const inputAmount = document.getElementById("expenseAmount");
const selectCategory = document.getElementById("expenseCategory");
const inputDate = document.getElementById("expenseDate");
const inputId = document.getElementById("expenseId");
const btnSave = document.getElementById("saveExpense");
const btnCancel = document.getElementById("cancelUpdate");
const btnUpdate = document.getElementById("updateExpense");
const expenseList = document.getElementById("expenseList");

//Cargar las categorias en el select
async function loadCategories() {
  try {
    const token = getToken();
    const categories = await apiFetch("/categories/list", "GET", null, token);

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category._id;
      option.textContent = category.name;
      selectCategory.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    alert("No pudimos cargar las categorias");
  }
}

//Guardar un gasto
async function saveExpense() {
  const title = inputTitle.value.trim();
  const amount = inputAmount.value.trim();
  const category = selectCategory.value;
  const date = inputDate.value;

  try {
    const token = getToken();
    await apiFetch(
      "/expenses/new",
      "POST",
      { title, amount, category, date },
      token,
    );
    alert("Gasto guardado correctamente");
    //loadExpenses();
  } catch (error) {
    console.error(error);
    alert("No pudimos crear el gasto");
  }
}

btnSave.addEventListener("click", saveExpense);

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  //loadExpenses();
});
