package my.com.froggy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import my.com.froggy.common.FroggyMsgConstants;
import my.com.froggy.dto.CommonResponseListDto;
import my.com.froggy.entity.Species;
import my.com.froggy.service.SpeciesService;

/**
 * The species RESTful Controller
 * 
 * @author KimHonoridez
 * @version 0.0.1
 */
@RestController
@RequestMapping("/species")
public class SpeciesController {

	@Autowired
	SpeciesService speciesService;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	CommonResponseListDto<Species> getAllSpecies() {
		CommonResponseListDto<Species> dto = new CommonResponseListDto<Species>(FroggyMsgConstants.S_COM1, (List<Species>) speciesService.findAll());
		return dto;
	}
}
