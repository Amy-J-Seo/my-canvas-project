export function moveTowards(person, desinationPosition, speed) {
  let distanceToTravelX = desinationPosition.x - person.position.x;
  let distanceToTravelY = desinationPosition.y - person.position.y;

  let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

  if (distance <= speed) {
    // we are there
    person.position.x = desinationPosition.x;
    person.position.y = desinationPosition.y;
  } else {
    let normalizedX = distanceToTravelX / distance;
    let normalizedY = distanceToTravelY / distance;
    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    distanceToTravelX = desinationPosition.x - person.position.x;
    distanceToTravelY = desinationPosition.y - person.position.y;
    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }
  return distance;
}
