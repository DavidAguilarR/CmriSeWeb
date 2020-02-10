package com.cmrise.ejb.services.corecases;

import java.util.List;

import javax.ejb.Local;

import com.cmrise.jpa.dto.corecases.CcHdrV1Dto;
import com.cmrise.jpa.dto.corecases.CcPreguntasHdrDto;
import com.cmrise.jpa.dto.corecases.CcPreguntasHdrV1Dto;

@Local
public interface CcPreguntasHdrLocal {

	public long insert(CcPreguntasHdrDto pCcPreguntasHdrDto); 
	public void delete(long pNumero); 
	public void update(long pNumero
			          ,CcPreguntasHdrDto pCcPreguntasHdrDto); 
	public CcPreguntasHdrV1Dto findByNumero(long pNumero);
	public List<CcPreguntasHdrV1Dto> findListByNumeroCcHdr(long pNumeroCcHdr); 
}