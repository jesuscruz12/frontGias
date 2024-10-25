import React from 'react';
import '../styles/Home.css'; // Archivo CSS para estilos
import CarouselOportunidades from '../components/CarouselOportunidades';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="main-title">Bienvenido a GIAS</h1>
      <CarouselOportunidades />
      <div className="info-container">
        <div className="info-block red">
          <h2>Pagos Desde</h2>
          <ul>
            <li>$334 - $1,000 SEMANAL</li>
            <li>$2,500 - $3,400 MENSUAL</li>
          </ul>
        </div>

        <div className="info-block blue">
          <h2>Recibe</h2>
          <ul>
            <li>$10,000 mil</li>
            <li>$30,000 mil</li>
            <li>$40,000 mil</li>
            <li>$50,000 mil</li>
          </ul>
        </div>

        <div className="info-block red">
          <h2>Beneficios</h2>
          <ul>
            <li>Contrato</li>
            <li>Tú eliges cuándo cobrar</li>
            <li>Recibes pagaré</li>
            <li>Préstamos individuales</li>
            <li>Bonos finales de participación</li>
            <li>Evidencias de entregas y pagos en tiempo real por grupo de WPP</li>
          </ul>
        </div>

        <div className="info-block blue">
          <h2>¿Para qué ser parte de GIAS?</h2>
          <ul>
            <li>Ampliar tu negocio</li>
            <li>Mejorar tu salud</li>
            <li>Ahorrar de manera segura</li>
            <li>Mejoras del hogar</li>
            <li>Pagar deudas</li>
            <li>Iniciar un negocio</li>
            <li>Viajar</li>
            <li>Comprar un auto</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
