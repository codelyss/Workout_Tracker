async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      totalDuration: getTotalDuration(lastWorkout),
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout)
    };

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

function getTotalDuration(lastWorkout) {
  let total = 0;
  for (var i = 0; i < lastWorkout.exercises.length; i++) {
    total += lastWorkout.exercises[i].duration;
  }
  return total;
}

function tallyExercises(lastWorkout) {
  let tWeight = 0;
  let tSets = 0;
  let tReps = 0;
  let tDistance = 0;
  let exercises = lastWorkout.exercises;
  for (var i = 0; i < exercises.length; i++) {
    let tex = exercises[i];
    let theType = tex.type;
    if (theType === "resistance") {
      if (tex.weight) {tWeight += tex.weight;}
      if (tex.sets) {tSets += tex.sets;}
      if (tex.reps) {tReps += tex.reps;}
    }
    else if (theType === "cardio") {
      if (tex.distance) {tDistance += tex.distance;}
    }
  }

  let workoutObj = {
    totalWeight: tWeight,
    totalSets: tSets,
    totalReps: tReps,
    totalDistance: tDistance
  };

  return workoutObj;
}

// function tallyExercises(exercises) {
//   alert(exercises[0].duration)
//   const tallied = exercises.reduce((acc, curr) => {
//     if (curr.type === "resistance") {
//       acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
//       acc.totalSets = (acc.totalSets || 0) + curr.sets;
//       acc.totalReps = (acc.totalReps || 0) + curr.reps;
//     } else if (curr.type === "cardio") {
//       acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
//     }
//     return acc;
//   }, {});
//   return tallied;
// }

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`: ${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
