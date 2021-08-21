import { Ship } from "../models/IShip";


let ships: Ship[] = [

  {
    "name": "Ship1",
    "code": "AAAA-1111-A1",
    "id": 1,
    "length": 1,
    "width": 1
  },
  {
    "name": "Ship2",
    "code": "AAAA-1111-A2",
    "id": 2,
    "length": 2,
    "width": 2
  },
  {
    "name": "Ship3",
    "code": "AAAA-1111-A3",
    "id": 3,
    "length": 3,
    "width": 3
  }
]
export const ShipFixture: Ship[] = ships.map(u => Ship.build(u));
