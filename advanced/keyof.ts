/** 点 */
interface Point {
  x: number;
  y: number;
}

type PointKey = keyof Point;

// success
let pointKey: PointKey = 'x';
pointKey = 'y';

// error - Type '0' is not assignable to type 'keyof Point'
// pointKey = 0;

/** 类型运算，本例中 MyPoint 等价于 Point */
type MyPoint = { [key in PointKey]: Point[key] }

const point: MyPoint = { x: 1, y: 1 };

export {};
