/**
 * extends 操作符，由<类型表达式>约束一个<类型变量>
 */

/** 点 - 2D */
interface Point {
  /** 2D - x */
  x: number;
  /** 2D - y */
  y: number;
}

/** 点 - 3D */
interface Point3D {
  /** 3D - x */
  x: number;
  /** 3D - y */
  y: number;
  /** 3D - z */
  z: number;
}

/**
 * move 方法，类型变量 T 需要符合 Point 结构要求（约束）
 */
function move<T extends Point>(point: T): T {
  point.x += 1;
  point.y += 1;
  return point;
}

// success
move({ x: 1, y: 1 });
move({ x: 1, y: 1, z: '231' });

// error - Type '{}' is missing the following properties from type 'Point': x, y
// move({});

// error - Property 'y' is missing in type '{ x: number; }' but required in type 'Point'.
// move({ x: 1 });

// error - Type 'string' is not assignable to type 'number'
// move({ x: 1, y: '1'});


/**
 * moveCompare 比较方法，强制要求参数和返回值为 Point
 */
function moveCompare(point: Point): Point {
  return point;
}

// success
moveCompare({ x: 1, y: 1 });

// error - Object literal may only specify known properties, and 'c' does not exist in type 'Point'.
// moveCompare({ x: 1, y: 1, c: 3 });


/**
 * transform 方法，类型变量 T 需要符合 Point 或 Point2D 的结构要求
 */
function transform<T extends Point | Point3D>(point: T): T {
  return point;
}

// success
transform({ x: 2, y: 2 });
transform({ x: 2, y: 2, z: 1 });
transform({ x: 1, y: 2, z: '23' });
transform({ x: 2, y: 2, z: 1, d: '123' });

// error - Type 'string' is not assignable to type 'number'.
// transform({ x: '1', y: '1' });
// transform({ z: '' });

// newPoint 会被自动推断为 Point3
const point3D: Point3D = { x: 1, y: 2, z: 3 };
const newPoint = transform(point3D);
// success
console.log(newPoint.z);


/**
 * transformCompare 比较方法，强制要求参数和返回值为 Point 或 Point3D
 */
function transformCompare(point: Point | Point3D): Point | Point3D {
  return point;
}

// newPoint1 会被推断为 Point | Point3D
const newPoint1 = transformCompare({ x: 1, y: 2, z: 2 });
// error - Property 'z' does not exist on type 'Point'
// console.log(newPoint1.z);

export {};
