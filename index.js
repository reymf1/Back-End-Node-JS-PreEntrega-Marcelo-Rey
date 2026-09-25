import {
  agregarProducto,
  eliminarProducto,
  obtenerProducto,
} from "./productos.js";

const [metodo, ruta, titulo, precio, categoria] = process.argv.slice(2);

if (!metodo) {
  throw new Error("Falta indicar el método");
}
if (!ruta) {
  throw new Error("Falta indicar la ruta");
}
const [, id] = ruta.split("/");
if (metodo.toUpperCase() === "GET") {
  if (
    ruta.toUpperCase() !== "PRODUCTS" &&
    (!ruta.toUpperCase().startsWith("PRODUCTS/") || !id || isNaN(id))
  ) {
    throw new Error("Ruta incorrecta");
  }
  obtenerProducto(ruta);
} else if (metodo.toUpperCase() === "POST") {
  if (ruta.toUpperCase() !== "PRODUCTS" || !titulo || !precio || !categoria) {
    throw new Error("Argumentos incorrectos para POST");
  }
  agregarProducto(titulo, precio, categoria);
} else if (metodo.toUpperCase() === "DELETE") {
  if (!ruta.toUpperCase().startsWith("PRODUCTS/") || !id || isNaN(id)) {
    throw new Error("Ruta incorrecta");
  }
  eliminarProducto(ruta);
} else {
  throw new Error("Error en los argumentos de la linea de comando");
}
