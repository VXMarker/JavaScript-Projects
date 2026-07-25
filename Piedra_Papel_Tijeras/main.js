const options = document.querySelectorAll(".options");

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    recorrerConPausa(".icon", "disable", 100);
  });
});

async function recorrerConPausa(selector, nombreClase, delay = 500) {
  const elementos = document.querySelectorAll(selector);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < elementos.length; i++) {
      const elemento = elementos[i];

      // 1. Eliminamos la clase (se verá el cambio)
      elemento.classList.remove(nombreClase);

      // 2. Esperamos 'delay' milisegundos (para que veas que la clase desapareció)
      await new Promise((resolve) => setTimeout(resolve, delay));

      // 3. Volvemos a poner la clase (se verá el cambio)
      elemento.classList.add(nombreClase);

      // 4. Esperamos otro poco antes de pasar al siguiente elemento
      await new Promise((resolve) => setTimeout(resolve, delay));

      // 5. Ahora sí, pasa al siguiente elemento del bucle
    }
  }
}

// Ejemplo de uso (cada paso dura 500ms):
// recorrerConPausa('.item', 'active', 500);
