package my.com.froggy.dto;

import java.time.LocalDate;
import org.springframework.util.StringUtils;

import my.com.froggy.common.FroggyConstants;

public class FrogDto {
	
	private String firstName;
	private String lastName;
	private char gender;
	private String birthDate;
	private Long speciesId;
	private String username;
	private String userKey;
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public char getGender() {
		return gender;
	}
	
	public void setGender(char gender) {
		this.gender = gender;
	}
	
	public String getBirthDate() {
		return birthDate;
	}
	
	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	
	public Long getSpeciesId() {
		return speciesId;
	}
	
	public void setSpeciesId(Long speciesId) {
		this.speciesId = speciesId;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getuserKey() {
		return userKey;
	}

	public void setuserKey(String userKey) {
		this.userKey = userKey;
	}

	public LocalDate getLocalBirthDate() {
		LocalDate retVal = null;
		
		if (this.birthDate != null && !this.birthDate.isEmpty()) {
			retVal = LocalDate.parse(this.birthDate, FroggyConstants.DATE_FORMAT);
		}
		
		return retVal;
	}
	
	public void setLocalBirthDate(LocalDate birthDate) {
		if (birthDate != null) {
			this.birthDate = birthDate.format(FroggyConstants.DATE_FORMAT);
		}
	}
	
	public boolean checkMandatoryFields() {
		boolean isValid = true;
		
		// Check all required fields
		if (StringUtils.isEmpty(firstName) ||
				StringUtils.isEmpty(lastName) ||
				StringUtils.isEmpty(birthDate) ||
				StringUtils.isEmpty(username) ||
				StringUtils.isEmpty(userKey) ||
				speciesId == null ||
				speciesId == 0 ||
				gender == '\u0000') {
			isValid = false;
		}
		
		return isValid;
	}
	
	public boolean isUsernameValid() {
		boolean isValid = true;
		
		if (!StringUtils.isEmpty(username)) {
			// Username accepts only alphanumeric characters and underscores
			isValid = username.matches("^[a-zA-Z0-9_]*$");
		}
		
		return isValid;
	}
	
	public boolean isUserKeyValid() {
		boolean isValid = true;
		
		// Userkey is valid only if username and birthdate are decrypted and validated
		if (!StringUtils.isEmpty(userKey)) {
			// Decrypt User Key
			
			// Check Decrypted Object Format Validity
			
			// Check if decrypted data coincides with the user data
		}
		
		return isValid;
	}
	
	public boolean isGenderCodeValid() {
		boolean isValid = true;
		
		// Gender should only be be 'M', 'F', 'X' for male, female and indeterminate respectively
		if (gender != 'M' && gender != 'F' && gender != 'X') {
			isValid = false;
		}
		
		return isValid;
	}
}
