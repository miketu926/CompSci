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
  if (!profile.kids) return profile.age;
  let age = profile.age;

  for (const kid of profile.kids) {
    age += addAges(kid);
  }

  return age;
}

console.log(addAges(profile));