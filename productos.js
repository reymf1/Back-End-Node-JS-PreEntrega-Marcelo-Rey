export async function obtenerProducto(ruta) {
  try {
    const url = `https://fakestoreapi.com/${ruta}`;
    const response = await fetch(url); //Devuelve la promesa

    if (!response.ok) {
      //Hay error?
      throw new Error("Error al obtener los productos");
    }
    const producto = await response.json(); //Transformo la respuesta a json
    console.log(producto);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Proceso de obtención de productos finalizado");
  }
}

export async function agregarProducto(titulo, precio, categoria) {
  try {
    const producto = {
      title: titulo,
      price: Number(precio),
      category: categoria,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    };

    const url = `https://fakestoreapi.com/products/`;
    const response = await fetch(url, config); //Devuelve la promesa

    if (!response.ok) {
      //Hay error?
      throw new Error("Error al agregar el producto");
    }
    const productoAgregado = await response.json(); //Transformo la respuesta a json
    console.log(productoAgregado);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Proceso de agregado de producto finalizado");
  }
}

export async function eliminarProducto(ruta) {
  try {
    const config = {
      method: "DELETE",
    };

    const url = `https://fakestoreapi.com/${ruta}`;
    const response = await fetch(url, config); //Devuelve la promesa

    if (!response.ok) {
      //Hay error?
      throw new Error("Error al eliminar el producto");
    }
    const productoEliminado = await response.json(); //Transformo la respuesta a json
    console.log(productoEliminado);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Proceso de eliminación de producto finalizado");
  }
}
