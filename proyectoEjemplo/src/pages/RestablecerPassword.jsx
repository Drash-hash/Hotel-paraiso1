import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { restablecerPasswordAPI } from "../services/recuperacionService";
export default function RestablecerPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [clave, setClave] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [listo, setListo] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const valido = /^[a-f0-9]{64}$/.test(token);
  async function guardar(e) {
    e.preventDefault();
    if (procesando || !valido) return;
    setError("");
    if (clave.length < 8 || clave !== confirmacion) { setError("Verifica la longitud y que las contraseñas coincidan."); return; }
    setProcesando(true);
    try { await restablecerPasswordAPI(token, clave); setListo(true); setClave(""); setConfirmacion(""); }
    catch (err) { setError(err.message); }
    finally { setProcesando(false); }
  }
  return <main className="container py-5"><div className="card shadow rounded-4 mx-auto p-4" style={{maxWidth: 480}}>
    <h2>Restablecer contraseña</h2>
    {listo ? <p className="alert alert-success">Contraseña actualizada correctamente.</p> : !valido ? <p className="alert alert-danger">Enlace inválido. Solicita uno nuevo.</p> : <form onSubmit={guardar}>
      <label className="form-label" htmlFor="clave">Nueva contraseña</label>
      <input id="clave" className="form-control mb-3" type="password" autoComplete="new-password" minLength={8} required value={clave} onChange={e => setClave(e.target.value)} />
      <label className="form-label" htmlFor="confirmacion">Confirmar contraseña</label>
      <input id="confirmacion" className="form-control mb-3" type="password" autoComplete="new-password" required value={confirmacion} onChange={e => setConfirmacion(e.target.value)} />
      {error && <p className="alert alert-danger">{error}</p>}
      <button disabled={procesando} className="btn w-100 text-white" style={{backgroundColor: "#6b7017"}}>{procesando ? "Guardando..." : "Cambiar contraseña"}</button>
    </form>}
    <Link className="mt-3" to="/">Volver al inicio</Link>
  </div></main>;
}