package com.cmrise.ejb.services.mrqs;

import java.util.List;

import javax.ejb.Local;

import com.cmrise.jpa.dto.mrqs.MrqsCorrelacionColumnasDto;
import com.cmrise.jpa.dto.mrqs.MrqsCorrelacionColumnasRespuestasDto;
import com.cmrise.utils.CorrelacionColumnasInsertException;

@Local
public interface MrqsCorrelacionColumnasLocal {

	public long insert(List<MrqsCorrelacionColumnasDto> item,List<MrqsCorrelacionColumnasRespuestasDto> respuestas, long fta_number) throws CorrelacionColumnasInsertException;
	public void update(long pNumero,MrqsCorrelacionColumnasDto item); 
	public List<MrqsCorrelacionColumnasDto> findByFta(long pNumeroFta);  
	public List<MrqsCorrelacionColumnasRespuestasDto> findRespuestasCorrectasByFta(long pNumeroFta);
	public void delete(long pNumero); 
}
