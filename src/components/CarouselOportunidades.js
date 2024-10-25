import React from 'react';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faHandHoldingUsd, faChartLine } from '@fortawesome/free-solid-svg-icons';
import '../styles/CarouselOportunidades.css'; // Asegúrate de crear este archivo CSS

const CarouselOportunidades = () => {
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Oportunidades</h2>
      <Carousel interval={3000} indicators={true}>
        <Carousel.Item>
          <div className="carousel-item-content">
            <FontAwesomeIcon icon={faCar} size="4x" className="carousel-icon" />
            <h3>Un vehículo para tu estilo de vida</h3>
            <p>Tu auto o moto siempre seguros</p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-item-content">
            <FontAwesomeIcon icon={faHandHoldingUsd} size="4x" className="carousel-icon" />
            <h3>Dinero para cualquier imprevisto</h3>
            <p>Apoyo inmediato en el momento indicado</p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="carousel-item-content">
            <FontAwesomeIcon icon={faChartLine} size="4x" className="carousel-icon" />
            <h3>Invierte y planifica tu futuro</h3>
            <p>Conoce cómo ahorrar o invertir tu dinero.</p>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselOportunidades;
