
export interface IShip {
  id: number;
  name: string;
  length: number;
  width: number;
  code: string;
}

export class Ship implements IShip{

constructor(
  public id: number,
  public  name: string,
  public length: number,
  public width: number,
  public code: string
) {

}
  static build(obj: any): Ship {
		if (obj instanceof Ship) {
			return obj;
		} else {
			return new Ship(
				obj['id'],
				obj['name'],
				obj['length'],
				obj['width'],
				obj['code']
			);
		}
	}
}
