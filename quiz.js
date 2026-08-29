function revealAnswer(btn){
  const box = btn.parentElement.querySelector('.reveal-ans');
  box.classList.add('shown');
  btn.style.display = 'none';
}

function initQuiz(moduleNum, questions){
  const answered = new Array(questions.length).fill(null);
  const scorePill = document.getElementById('scorePill');
  const statusEl = document.getElementById('quizStatus');
  const retakeBtn = document.getElementById('retakeBtn');

  function updateScore(){
    const correctCount = answered.filter((a, i) => a === questions[i].correct).length;
    const answeredCount = answered.filter(a => a !== null).length;
    scorePill.textContent = correctCount + ' / ' + questions.length;
    if(answeredCount === questions.length){
      if(correctCount >= 4){
        statusEl.textContent = 'Passed — show your trainer';
        statusEl.className = 'status pass';
      } else {
        statusEl.textContent = 'Not yet passing — retake the quiz';
        statusEl.className = 'status fail';
      }
    } else {
      statusEl.textContent = 'In progress';
      statusEl.className = 'status';
    }
  }

  questions.forEach((q, qi) => {
    const optButtons = document.querySelectorAll('.qitem[data-qi="' + qi + '"] .opt');
    optButtons.forEach((btn, oi) => {
      btn.addEventListener('click', () => {
        if(answered[qi] !== null) return;
        answered[qi] = oi;
        optButtons.forEach((b, bi) => {
          b.disabled = true;
          if(bi === q.correct) b.classList.add('correct');
          else if(bi === oi) b.classList.add('incorrect');
        });
        updateScore();
      });
    });
  });

  retakeBtn.addEventListener('click', () => {
    for(let i=0;i<answered.length;i++) answered[i] = null;
    document.querySelectorAll('.opt').forEach(b => {
      b.disabled = false;
      b.classList.remove('correct','incorrect');
    });
    updateScore();
  });

  updateScore();
}
