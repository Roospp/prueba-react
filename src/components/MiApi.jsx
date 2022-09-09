import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "./Header";

const MiApi = () => {

  const [usuarioDinamico, setUsuarioDinamico] = useState([]);
  const [usuarioEstatico, setUsuarioEstatico] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  
  const usuariosRender = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("X-RapidAPI-Key", "61c83043aamsh99e6b32836997c1p191d43jsnab6d2d84cb18");
      myHeaders.append("X-RapidAPI-Host", "free-nba.p.rapidapi.com");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const endpoint = "https://free-nba.p.rapidapi.com/players?page=0&per_page=100";
      const response = await fetch(endpoint, requestOptions);
      let { data } = await response.json();
      setUsuarioDinamico(data);
      
      setUsuarioEstatico(data.sort((a, b) => a.first_name !== b.first_name ? a.first_name < b.first_name ? -1 : 1 : 0));
    } catch (error) {
      alert(error.message);
    }
  };

  
  useEffect(() => {
    usuariosRender();
  }, []);

  
  const filtrarUsuario = (e) => {
    let valor_input = e.target.value;
    setBusqueda(e.target.value);

    let filtrarBusqueda = usuarioEstatico.filter((usuario) => {
      return (
        usuario.first_name.toLowerCase().includes(valor_input.toLowerCase()) ||
        usuario.last_name.toLowerCase().includes(valor_input.toLowerCase()) ||
        usuario.team.name.toLowerCase().includes(valor_input.toLowerCase())
      );
    });

    setUsuarioDinamico(filtrarBusqueda);
  };

  return (
    <div className="mi-api">
      <Header busqueda={busqueda} filtrarUsuario={filtrarUsuario} />
      <h2>Lista de jugadores</h2>

      <section className="section">
        {usuarioDinamico.map((usuario) => {
          return (
            <div key={usuario.id} className="card">
              
              <p>Nombre: {usuario.first_name}</p>
              <p>Apellido: {usuario.last_name}</p>
              <p>Equipo: {usuario.team.name}</p>
              <button>Ver más</button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default MiApi;
