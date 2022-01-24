import React, { Component } from "react";
import "./estilo.css";

class FormularioCadastro extends Component {
  constructor(props) {
    super(props);
    this.titulo = "";
    this.texto = "";
    this.categoria = "Sem Categoria";
    this.state = {categorias:[]}
    this._novasCategorias = this._novasCategorias.bind(this);
  }

  componentDidMount() {
    this.props.categorias.inscrever(this._novasCategorias);
  }
  
  componentWillUnmount() {
    this.props.categorias.desinscrever(this._novasCategorias);
  }
  
  _novasCategorias(categorias) {
    this.setState({...this.state, categorias});
  }

  _handleMudancaCategoria(event) {
    event.stopPropagation();
    this.categoria = event.target.value;
  }

  _handleMudancaTitulo(event) {
    event.stopPropagation();
    this.titulo = event.target.value;
  }

  _handleMudancaTexto(event) {
    event.stopPropagation();
    this.texto = event.target.value;
  }

  _criarNota(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.criarNota(this.titulo, this.texto, this.categoria);
  } 
  
  render() {
    return (
      <form onSubmit={this._criarNota.bind(this)} className="form-cadastro">
        <select onChange={this._handleMudancaCategoria.bind(this)} 
          className="form-cadastro_input">
          <option>Sem Categoria</option>
          {this.state.categorias.map((categoria, index) => {
            return <option key={index}>{categoria}</option>
          })}
        </select>
        <input onChange={this._handleMudancaTitulo.bind(this)} type="text" placeholder="Título" className="form-cadastro_input"/>
        <textarea onChange={this._handleMudancaTexto.bind(this)} rows={15} placeholder="Escreva sua nota..." className="form-cadastro_input"></textarea>
        <button className="form-cadastro_input form-cadastro_submit">Cria Nota</button>
      </form>
    );
  }
}

export default FormularioCadastro;