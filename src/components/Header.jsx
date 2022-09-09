import React from "react";


const Header = ({busqueda, filtrarUsuario}) => {
  return (
    <div className="header">
      <div className="hero">
        <h1> Equipos de la NBA</h1>
      </div>
      <div className="buscador">
      <h2>Buscar jugadores</h2>
      <input
          type="text"
          placeholder="Buscar Jugador..."
          onChange={filtrarUsuario}
          value={busqueda}
        />
    </div>
      </div>
  );
};

export default Header;
