// get all workout data from back-end

fetch('/api/workouts/range')
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });

API.getWorkoutsInRange();

function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600'
  ];

  return arr;
}
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');
  console.log(data);
  const workoutDays = data.map(({ day }) => {
    const parsedDate = new Date(day);
    const dayOfWeek = parsedDate.getDay();
    console.log(dayOfWeek);
    switch (dayOfWeek) {
      case 0:
      case '0':
        return 'Sunday';
      case 1:
      case '1':
        return 'Monday';
      case 2:
      case '2':
        return 'Tuesday';
      case 3:
      case '3':
        return 'Wednesday';
      case 4:
      case '4':
        return 'Thursday';
      case 5:
      case '5':
        return 'Friday';
      case 6:
      case '6':
        return 'Saturday';
      default:
        return 'Invalid Date';
    }
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels: workoutDays,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels: workoutDays,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Excercises Performed',
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Excercises Performed'
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Excercises Performed',
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Excercises Performed'
      }
    }
  });
}

function duration(data) {
  let durations = [];

  data.forEach(workout => {
    durations.push(workout.exercises.reduce((total, { duration }) => total + duration, 0));
  });
  console.log(durations);
  return durations;
}

function calculateTotalWeight(data) {
  let total = [];
  data.forEach(({ exercises }) => {
    total.push(exercises.reduce((totalCount, { weight = 0 }) => totalCount + weight, 0));
  });
  return total;
}}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}