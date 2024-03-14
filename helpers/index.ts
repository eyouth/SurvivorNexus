/**
 * 
 * @param {*} value - check whether the value is empty | null | undefined 
 * @returns boolean
 */
export function isNullOrEmpty(value: any) {

	if (value == null || value == undefined) {
		return true;
	}

	if (typeof value == 'string' && value.trim() == '') {
		return true;
	}

	if (Array.isArray(value) && value.length === 0) {
		return true;
	}

	if (typeof value === 'object' && Object.keys(value).length === 0) {
		return true;
	} else if (typeof value === 'object' && Object.keys(value).length > 0) {
		if (value.hasOwnProperty('error')) {
			return true;
		}
	}

	if (typeof value === 'number' && isNaN(value)) {
		return true;
	}

	return false;
}

/**
 * 
 * @param start 
 * @param end 
 * @returns 
 */
export const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}