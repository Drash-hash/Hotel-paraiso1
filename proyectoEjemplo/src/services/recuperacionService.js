const API_URL = "http://localhost:3000/api/recuperacion";
async function enviar(ruta, datos) {
  const respuesta = await fetch(`${API_URL}/${ruta}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  const resultado = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) throw new Error(resultado.mensaje || "Error en la solicitud");
  return resultado;
}
export const solicitarRecuperacionAPI = correo => enviar("solicitar", { correo });
export const restablecerPasswordAPI = (token, nuevaPassword) => enviar("restablecer", { token, nuevaPassword });