class Connection {
  constructor(ba, bb) {
    var link = ba.bodies.length - 3;
    var connection_features = {
      bodyA: ba.bodies[link],
      pointA: { x: 0, y: 0 },
      bodyB: bb,
      pointB: { x: 0, y: 0 },
      length: -20,
      stiffness: 0.01,
    };
    this.connection = Constraint.create(connection_features);
    World.add(world, this.connection);
  }

  detachFruit() {
    World.remove(world, this.connection);
  }
}
