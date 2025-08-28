import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "../../components/Buttons";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Checkbox from "../../components/Checkbox";
import { InputPrice } from "../../components/Inputs/Price";
/**
 *
 * TODO adicionar os seletores
 * TODO adicionar SVG de edição da foto
 * ? As classes podem estar confusas, talves seja bom dar uma analisada
 *
 */

export default function AddHamburguer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="add-container">
      <div className="add-first-section">
        <div className="add-left">
          <img
            className="add-image"
            src="https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?_gl=1*r2dcly*_ga*MTI3NDUyOTg5NC4xNzU0Njc3NTE2*_ga_8JE65Q40S6*czE3NTQ4ODA2MTMkbzIkZzEkdDE3NTQ4ODA2MjAkajUzJGwwJGgw"
            alt="foto do hamburguer"
          />
        </div>

        <div className="add-right">
          <h2 className="name">X-burgão dos melhores</h2>
          <div className="description">
            <div className="description-left">
              <span className="subtitle">Descrição:</span>
              <p>
                Produzito de forma 100% artesanal, entregando o melhor da
                culinária da região, o hamburguer mais pika que você vai comer
                em toda a sua miseravel vida
              </p>
            </div>
            <div className="description-right">
             <label className="subtitle">Preço:</label>
              <InputPrice placeholder="Ex:25,50"/>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h2>Ingredientes</h2>
      <div className="ingredients">
        <Checkbox children="molho" />
        <Checkbox children="alho" />
        <Checkbox children="cebola" />
        <Checkbox children="frango desfiado" />
        <Checkbox children="molho barbecue doce" />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        {/* adicionar seletores aqui */}
      </div>
      <hr />

      <div className="buttons-section">
        <Button children="Cancelar" variant="outlined" size="medium" />
        <Button children="Confirmar" size="medium" />
      </div>
    </div>
  );
}
