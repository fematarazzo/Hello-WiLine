import '@/styles/index.scss'
import Typed from 'typed.js'

let url = 'http://localhost:5050'
const result = document.querySelector('#result')

const searchAPI = (queryOne, queryTwo, queryThree) => {
  if (queryOne && queryTwo && queryThree) {
    url = `http://localhost:5050/${queryOne}/${queryTwo}/${queryThree}`
  } else if (queryOne && queryTwo) {
    url = `http://localhost:5050/${queryOne}/${queryTwo}/`
  } else if (queryOne) {
    url = `http://localhost:5050/${queryOne}/`
  }

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const apiResult = 
        `<div class="mt-5 fade-in box-white">
          <h2>${data}</h2>
        </div>`
      result.insertAdjacentHTML('beforeend', apiResult)
      if (queryOne || queryTwo || queryThree) {
        const stats = 
        `<div class="mt-5 fade-in">
          <h2>These were the chosen queries:</h2>
          <ul>
            <li>1st Path: <span class='red'>${queryOne}</span></li>
            <li>2nd Path: <span class='red'>${queryTwo}</span></li>
            <li>3nd Path: <span class='red'>${queryThree}</span></li>
          </ul>
        </div>`
        result.insertAdjacentHTML('beforeend', stats)
      } else {
        const noQuery = 
        `<div class="mt-5 fade-in">
          <h2 class='red'>There was no query input</h2>
        </div>`
        result.insertAdjacentHTML('beforeend', noQuery)
      }
    })
}

const form = document.querySelector('#search-form')

form.addEventListener('submit', (event) => {
  event.preventDefault() // <-- to prevent <form>'s native behaviour
  const inputOne = event.currentTarget.querySelector('#searchInputOne')
  const inputTwo = event.currentTarget.querySelector('#searchInputTwo')
  const inputThree = event.currentTarget.querySelector('#searchInputThree')
  result.innerHTML = ''
  searchAPI(inputOne.value, inputTwo.value, inputThree.value)
})

let typed = new Typed('.typed-text', {
  strings: [
    "Check the <span class='red'>API</span>",
    "Enter your <span class='red'>queries</span>",
    "See the <span class='red'>magic!</span>",
  ],
  smartBackspace: true,
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
})
