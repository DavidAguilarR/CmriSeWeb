package com.cmrise.ejb.model.corecases;

import java.io.Serializable;

public class CcOpcionMultiple implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private long numero; 
	private long numeroFta; 
	private boolean estatus; 
	private String textoRespuesta; 
	private String textoExplicacion;
	private int numeroLinea; 
	private int idxTemp; 
	
	
	public long getNumero() {
		return numero;
	}
	public void setNumero(long numero) {
		this.numero = numero;
	}
	public long getNumeroFta() {
		return numeroFta;
	}
	public void setNumeroFta(long numeroFta) {
		this.numeroFta = numeroFta;
	}
	public boolean isEstatus() {
		return estatus;
	}
	public void setEstatus(boolean estatus) {
		this.estatus = estatus;
	}
	public String getTextoRespuesta() {
		return textoRespuesta;
	}
	public void setTextoRespuesta(String textoRespuesta) {
		this.textoRespuesta = textoRespuesta;
	}
	public String getTextoExplicacion() {
		return textoExplicacion;
	}
	public void setTextoExplicacion(String textoExplicacion) {
		this.textoExplicacion = textoExplicacion;
	}
	public int getNumeroLinea() {
		return numeroLinea;
	}
	public void setNumeroLinea(int numeroLinea) {
		this.numeroLinea = numeroLinea;
	}
	public int getIdxTemp() {
		return idxTemp;
	}
	public void setIdxTemp(int idxTemp) {
		this.idxTemp = idxTemp;
	} 

}
