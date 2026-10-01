import { request } from "./request.js";
const [metodo, ruta, ...argumentos] = process.argv.slice(2);
const urlBase = `https://fakestoreapi.com`;
try {
  if (!metodo) {
    throw new Error("Falta indicar el método");
  }
  if (!ruta) {
    throw new Error("Falta indicar la ruta");
  }
  const [recurso, id] = ruta.split("/");
  if (metodo.toUpperCase() === "GET") {
    if (
      ruta.toUpperCase() !== "PRODUCTS" &&
      (!ruta.toUpperCase().startsWith("PRODUCTS/") || !id || isNaN(id))
    ) {
      throw new Error("Ruta incorrecta");
    }
    if (id) {
      const data = await request(`${urlBase}/${recurso}/${id}`);
      console.log(data);
    } else {
      const data = await request(`${urlBase}/${recurso}`);
      console.log(data);
    }
  } else if (metodo.toUpperCase() === "POST") {
    if (ruta.toUpperCase() !== "PRODUCTS" || argumentos.length !== 3) {
      throw new Error("Argumentos incorrectos para POST");
    }
    const [titulo, precio, categoria] = argumentos;
    const producto = {
      title: titulo,
      price: Number(precio),
      category: categoria,
    };
    const data = await request(`${urlBase}/${recurso}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    console.log(data);
  } else if (metodo.toUpperCase() === "DELETE") {
    if (!ruta.toUpperCase().startsWith("PRODUCTS/") || !id || isNaN(id)) {
      throw new Error("Ruta incorrecta");
    }
    const data = await request(`${urlBase}/${recurso}/${id}`, {
      method: "DELETE",
    });
    console.log(data);
  } else {
    throw new Error("Error en los argumentos de la linea de comando");
  }
} catch (error) {
  console.log(error);
}
