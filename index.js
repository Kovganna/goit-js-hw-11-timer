 /*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

class CountdownTimer {
  constructor({targetDate, selector}) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  getRefs(){
    const body = document.body;
    const container = document.querySelector(this.selector);
    const daysRef = container.querySelector('[data-value="days"]');
    const hoursRef = container.querySelector('[data-value="hours"]');
    const minsRef = container.querySelector('[data-value="mins"]');
    const secsRef = container.querySelector('[data-value="secs"]');
    return {daysRef, hoursRef, minsRef, secsRef, container, body}
  }

  upDateTimer({daysRef, hoursRef, minsRef, secsRef, container, body}){
    const time = this.targetDate - Date.now();
    if(time < 0) {
      clearInterval(this.intervalId);
      container.innerHTML = '<h1>Time is up!</h1>'
      return;
    }
  
   daysRef.textContent = Math.floor(time / (1000 * 60 * 60 * 24))
   .toString()
   .padStart(2, "0");
   hoursRef.textContent = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
   .toString()
   .padStart(2, "0");
   minsRef.textContent = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
   .toString()
   .padStart(2, "0");
   secsRef.textContent = Math.floor((time % (1000 * 60)) / 1000)
   .toString()
   .padStart(2, "0"); 
  }



  start() {
    this.intervalId = setInterval(() =>{
this.upDateTimer(this.getRefs())
  }, 1000)
}
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2022 00:00'),
  // targetDate: new Date('Aug 15, 2021 18:38'),
});

timer.start();