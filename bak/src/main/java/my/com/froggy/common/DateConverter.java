package my.com.froggy.common;

import java.time.LocalDate;

public class DateConverter {
	public static LocalDate toLocalDate(String date) {
		LocalDate localDate = null;
		
		try {
			localDate = LocalDate.parse(date, FroggyConstants.DATE_FORMAT);
		}
		catch(Exception e) {
			// Do nothing
		}
		
		return localDate;
	}
}
