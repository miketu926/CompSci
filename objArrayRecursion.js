const profile = {
  name: "mike",
  age: 10,
  kids: [
    {
      name: "johnny",
      age: 5,
    },
    {
      name: "sam",
      age: 5,
      kids: [
        {
          name: "sam1",
          age: 5
        }
      ]
    }
  ]
};

// output should be 25 totalAge

const addAges = (profile) => {
  let age = profile.age;
  if (!profile.kids) return age;

  for (const kid of profile.kids) {
    age += addAges(kid);
  }

  return age;
}

console.log(addAges(profile));