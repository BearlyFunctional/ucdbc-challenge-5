// ## User Story

// ```md
// AS AN employee with a busy schedule
// I WANT to add important events to a daily planner
// SO THAT I can manage my time effectively
// ```

// ## Acceptance Criteria

// ```md
// GIVEN I am using a daily planner to create a schedule

// *WHEN I open the planner
// *THEN the current day is displayed at the top of the calendar

// *WHEN I scroll down
// *THEN I am presented with timeblocks for standard business hours of 9am&ndash;5pm

// *WHEN I view the timeblocks for that day
// *THEN each timeblock is color coded to indicate whether it is in the past, present, or future

// *WHEN I click into a timeblock
// *THEN I can enter an event

// *WHEN I click the save button for that timeblock
// *THEN the text for that event is saved in local storage

// *WHEN I refresh the page
// *THEN the saved events persist
// ```

var currentDateEl = document.querySelector('#currentDay')
var blockContainer = document.querySelector('#time-block-container')
var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

var toDoContent = localStorage.getItem('toDoContent')
toDoContent = JSON.parse(toDoContent)
if (toDoContent == null) {
    console.log('No todo content.')
    var toDoContent = ['', '', '', '', '', '', '', '', '']
}

for (let i = 0; i < toDoContent.length; i++) {
  const element = toDoContent[i];
  blockContainer.children[i].children[1].textContent = toDoContent[i]
}


currentDateEl.textContent = weekDays[dayjs().day()] + ', ' + dayjs().format('MMMM DD')

for (let I = 0; I < 9; I++) {
  if (blockContainer.children[I].id.replace(/\D/g,'') < dayjs().hour()) {
    blockContainer.children[I].classList.add('past')
  } else if (blockContainer.children[I].id.replace(/\D/g,'') > dayjs().hour()) {
    blockContainer.children[I].classList.add('future')
  } else if (blockContainer.children[I].id.replace(/\D/g,'') == dayjs().hour()) {
    blockContainer.children[I].classList.add('present')
  }
}


function saveLine() {
  var clckTrgt = event.target
  if (clckTrgt.classList.toString().includes('saveBtn')) {
    console.log(clckTrgt)
    var textContent = clckTrgt.parentElement.children[1].value
    var slotNum = clckTrgt.parentElement.id.replace(/\D/g,'')
    toDoContent[slotNum -= 9] = textContent
    localStorage.setItem('toDoContent', JSON.stringify(toDoContent))
    console.log(toDoContent)
    if (clckTrgt.children[0].classList.toString().includes('fa-save')) {
      console.log(clckTrgt.children[0].classList)
      clckTrgt.children[0].classList.remove("fa-save")
      clckTrgt.children[0].classList.add("fa-check")
      setTimeout(() => {
        clckTrgt.children[0].classList.add("fa-save"),
        clckTrgt.children[0].classList.remove("fa-check")
      },1500)
    }
  }
}


blockContainer.addEventListener('click', saveLine)
