const words = [
  { eng: "surrounding", kor: "주변의" },
  { eng: "urban", kor: "도시의" },
  { eng: "rural", kor: "시골의" },
  { eng: "concentration", kor: "농도, 집중" },
  { eng: "evaporate", kor: "증발하다" },
  { eng: "vegetation", kor: "초목, 식물" },
  { eng: "absorb", kor: "흡수하다" },
  { eng: "exposed", kor: "노출된" },
  { eng: "surface temperature", kor: "표면 온도" },
  { eng: "albedo", kor: "반사율" },
  { eng: "surface roughness", kor: "표면 거칠기" },
  { eng: "emission", kor: "배출" },
  { eng: "radiation", kor: "복사, 방사" },
  { eng: "infrared", kor: "적외선의" },
  { eng: "retard", kor: "지연시키다" },
  { eng: "humidity", kor: "습도" },
  { eng: "climatological", kor: "기후학적인" },
  { eng: "nuclei", kor: "핵, 중심" },
  { eng: "condense", kor: "응결하다" },
  { eng: "haze", kor: "연무, 안개" },
  { eng: "terrain", kor: "지형" },
  { eng: "converge", kor: "모이다, 집중되다" },
  { eng: "unstable", kor: "불안정한" },
  { eng: "thunderstorm", kor: "뇌우" },
  { eng: "thermal", kor: "열의" },
  { eng: "dispersion", kor: "분산, 확산" },
  { eng: "gradually", kor: "점차적으로" },
  { eng: "pronounced", kor: "뚜렷한, 두드러진" },
  { eng: "artificial", kor: "인공적인" },
  { eng: "visibility", kor: "가시성" },
];

let shuffledWords = [];
let index = 0;
let score = 0;
let correctWords = [];
let wrongWords = [];

let selectedMode = "";
let selectedCount = 10;

const meaningEl = document.getElementById("meaning");
const inputEl = document.getElementById("answer");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");

function startQuiz(mode) {
  selectedMode = mode;
  document.getElementById("mode-select").style.display = "none";
  document.getElementById("count-select").style.display = "block";
  resultEl.innerHTML = "";
  inputEl.value = "";
}

function startQuizWithCount(count) {
  selectedCount = count;
  document.getElementById("count-select").style.display = "none";
  startActualQuiz();
}

function startActualQuiz() {
  shuffledWords = words.sort(() => Math.random() - 0.5).slice(0, selectedCount);
  index = 0;
  score = 0;
  correctWords = [];
  wrongWords = [];

  document.getElementById("quiz").style.display = "block";
  document.getElementById("restart").style.display = "none";
  inputEl.style.display = "inline-block";
  inputEl.value = "";
  inputEl.focus();
  document.querySelector("#quiz button").style.display = "inline-block";

  showWord();
}

function showWord() {
  if (index >= shuffledWords.length) {
    endQuiz();
    return;
  }
  const word = shuffledWords[index];
  progressEl.textContent = `단어 ${index + 1} / ${selectedCount}`;
  meaningEl.textContent = selectedMode === "korToEng" ? `뜻: ${word.kor}` : `단어: ${word.eng}`;
  inputEl.value = "";
  inputEl.focus();
}

function submitAnswer() {
  const userInput = inputEl.value.trim().toLowerCase().replace(/\s/g, "");
  const currentWord = shuffledWords[index];

  const correctAnswer = selectedMode === "korToEng"
    ? currentWord.eng.toLowerCase().replace(/\s/g, "")
    : currentWord.kor.toLowerCase().replace(/\s/g, "");

  if (userInput === correctAnswer) {
    score++;
    correctWords.push(currentWord);
  } else {
    wrongWords.push({ ...currentWord, user: inputEl.value });
  }

  index++;
  if (index < selectedCount) {
    showWord();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  meaningEl.textContent = "🎉 퀴즈 완료!";
  inputEl.style.display = "none";
  document.querySelector("#quiz button").style.display = "none";
  document.getElementById("restart").style.display = "inline-block";

  let correctList = correctWords.map(w => `✔️ ${w.eng} - ${w.kor}`).join("<br>") || "없음";
  let wrongList = wrongWords.map(w => `❌ ${w.eng} - ${w.kor} (입력: ${w.user})`).join("<br>") || "없음";

  resultEl.innerHTML = `
    <p>점수: ${score} / ${selectedCount}</p>
    <hr>
    <p><strong>맞춘 단어</strong><br>${correctList}</p>
    <p><strong>틀린 단어</strong><br>${wrongList}</p>
  `;
}

function restartQuiz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("count-select").style.display = "none";
  document.getElementById("mode-select").style.display = "block";
  resultEl.innerHTML = "";
  inputEl.value = "";
  inputEl.style.display = "inline-block";
  document.querySelector("#quiz button").style.display = "inline-block";
}