const generateNumbers = (min, max) => {
  min = Number(min)
  max = Number(max)

  const output = document.getElementById('random-numbers');
  let randomNumbers = [];

  for (let i = 0; i < 6; i++) {
    const result = min + Math.random() * (max - min);
    randomNumbers.push(Math.round(result))
  }

  output.innerText =
    `Minimum value: ${min}
    Maximum value: ${max}
    
    Random numbers within range: ${[...randomNumbers]}`
}