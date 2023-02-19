import { deepStrictEqual } from 'node:assert/strict';
import { IValueObject } from '../interfaces/value-object.interface';

/**
 * Object based value object
 */
export abstract class RecordValueObject<T extends Record<string, any>>
	implements IValueObject<T>
{
	/**
	 * Creates a new value object
	 * @param value Value
	 */
	constructor(public readonly value: T) {
		this.value = Object.freeze(value);

		if (value === null || value === undefined || this.validate(value))
			// TODO: Replace with custom error
			throw new Error(
				`"${JSON.stringify(value)}" is not a valid ${this.constructor.name}`
			);
	}

	/**
	 * Validates the value of the value object
	 * @param value Value
	 * @returns Is valid
	 */
	protected abstract validate(value: T): boolean;

	/**
	 * Compares if the value object has the same value as a given one
	 * @param valueToCompare Value to compare
	 * @returns Are the same value
	 */
	public equals(valueToCompare: this): boolean {
		try {
			deepStrictEqual(valueToCompare, this);
		} catch {
			return false;
		}

		return true;
	}
}
