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
}

const addAges = (profile) => {
  let allAges = profile.age;

  if (Array.isArray(profile.kids)) {
    for (const kid of profile.kids) {
      allAges = allAges + kid.age;
      addAges(kid);
    }


    return allAges;
  }
}

console.log(addAges(profile));