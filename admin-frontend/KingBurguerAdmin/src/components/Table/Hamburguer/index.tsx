import React from "react";
import "./style.css";
import { Pencil } from "../../../assets/misc/Pencil";
import { Trash } from "../../../assets/misc/Trash";

export default function TableHamburguer() {
  return (
    <div className="table-container">
      
      <table className="table">
        <tr className="table-header">
          <th>Lanche</th>
          <th>Preço</th>
          <th>Editar lanche</th>
          <th>Excluir lanche</th>
        </tr>

        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>
          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>

        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>

        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>

        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>

        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>

        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>
        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>
        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>
        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>
        <tr className="separator-row">
          <td colSpan={4}>
            <div className="separator-line"></div>
          </td>
        </tr>
        <tr className="table-row">
          <td className="row-content product-name">X-bacon</td>
          <td className="row-content product-info">45,50R$</td>

          <td className="row-content product-info">
            <button className="table-button">
              <Pencil />
            </button>
          </td>
          <td className="row-content product-info">
            <button className="table-button">
              <Trash />
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}
